import * as GAME from "./game.ts";
import {
  AnswerResponse,
  EvaluateResponseProps,
  InvalidStep,
  ValidStep,
  GameStepEvaluation,
} from "./types.ts";

const answerMatchRegex = (answer: string[]) => {
  const [verbs, nouns] = answer;

  //   /^(jump|enter|swim).+(pool|water)$/i
  return new RegExp(
    "(" +
    verbs.split(" ").join("|") +
    ").*(" +
    nouns.split(" ").join("|") +
    ")",
    "i"
  );
};

export const checkAnswerMatch = ({ answer, response }: AnswerResponse) => {
  const regex = answerMatchRegex(answer);
  return regex.test(response);
};


export const evaluateResponse = ({
  getGameStep,
  response,
  player,
}: EvaluateResponseProps): GameStepEvaluation => {
  const { valid, invalid } = getGameStep(player);

  const invalidMatch = invalid.find(({ answer }: InvalidStep) =>
    checkAnswerMatch({ answer, response })
  );
  if (invalidMatch) {
    return {
      updatedInvalidMessage: invalidMatch.message,
      updatedGetGameStep: getGameStep,
      updatedPlayer: player,
    };
  }

  const validMatch = valid.find(({ answer }: ValidStep) =>
    checkAnswerMatch({ answer, response })
  );
  if (validMatch) {
    if (validMatch.conditions?.length) {
      player.conditions.push(...validMatch.conditions);
    }
    if (validMatch.removeConditions?.length) {
      player.conditions = player.conditions.filter(
        (item) => !validMatch.removeConditions.includes(item)
      );
    }
    if (validMatch.addToInventory?.length) {
      player.inventory.push(...validMatch.addToInventory);
    }
    if (validMatch.removeFromInventory?.length) {
      player.inventory = player.inventory.filter(
        (item) => !validMatch.removeFromInventory.includes(item)
      );
    }
    return { updatedGetGameStep: validMatch.nextStep, updatedPlayer: player };
  }

  return {
    updatedErrorMessage: `You cannot ${response}`,
    updatedGetGameStep: getGameStep,
    updatedPlayer: player,
  };
};