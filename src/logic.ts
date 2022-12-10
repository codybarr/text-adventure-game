import * as GAME from "./game.ts";
import {
  AnswerResponse,
  GameStep,
  InvalidStep,
  ValidStep,
  Player,
  Item,
  Condition,
} from "./types.ts";

import { blue, white } from "https://deno.land/std@0.162.0/fmt/colors.ts";

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

export const formatConditionsList = (conditions: Condition[]) =>
  conditions.reduce(
    (prev, curr, index) => `${prev}${index !== 0 ? "," : ""}${curr.name}`,
    ""
  );

export const formatInventoryList = (inventory: Item[]) =>
  inventory
    .map(({ plural, name }: Item) => `${plural ? "" : "a "}${name}`)
    .join(", ");

export const logPlayer = (player: Player): void => {
  const { conditions, inventory } = player;

  if (conditions.length || inventory.length) {
    console.log("\n");
  }
  if (conditions.length) {
    console.log(white(`You are ${formatConditionsList(conditions)}`));
  }
  if (inventory.length) {
    console.log(white(`You have ${formatInventoryList(inventory)}`));
  }
};

export interface EvaluateResponseProps {
  getGameStep: Function;
  response: string;
  player: Player;
}

interface GameStepVerification {
  invalidMessage?: string;
  error?: string;
  getGameStep: Function;
  updatedPlayer: Player;
}

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