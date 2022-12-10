import * as GAME from "./game.ts";
import {
  AnswerResponse,
  GameStepVerification,
  EvaluateResponseProps,
  InvalidStep,
  ValidStep,
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
}: EvaluateResponseProps): GameStepVerification => {
  const { valid, invalid } = getGameStep(player);

  const invalidMatch = invalid.find(({ answer }: InvalidStep) =>
    checkAnswerMatch({ answer, response, player })
  );
  if (invalidMatch) {
    return {
      invalidMessage: invalidMatch.message,
      getGameStep,
      updatedPlayer: player,
    };
  }

  const validMatch = valid.find(({ answer }: ValidStep) =>
    checkAnswerMatch({ answer, response, updatedPlayer: player })
  );
  if (validMatch) {
    if (validMatch.conditions?.length) {
      player.conditions.push(...validMatch.conditions);
    }
    if (validMatch.addToInventory?.length) {
      player.inventory.push(...validMatch.addToInventory);
    }
    if (validMatch.removeFromInventory?.length) {
      player.inventory = player.inventory.filter(
        (item) => !validMatch.removeFromInventory.includes(item)
      );
    }
    return { getGameStep: validMatch.nextStep, updatedPlayer: player };
  }

  return {
    error: `You cannot ${response}`,
    getGameStep,
    updatedPlayer: player,
  };
};