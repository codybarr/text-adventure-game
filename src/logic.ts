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

import { blue } from "https://deno.land/std@0.162.0/fmt/colors.ts";

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

  if (conditions.length > 0) {
    console.log(blue(`You are ${formatConditionsList(conditions)}`));
  }
  if (inventory.length > 0) {
    console.log(blue(`You have ${formatInventoryList(inventory)}`));
  }
};

export interface CheckValidProps {
  gameStep: GameStep;
  gameStepFn: Function;
  response: string;
  player: Player;
}

interface GameStepVerification {
  invalidMessage?: string;
  error?: string;
  gameStep: GameStep;
  gameStepFn: Function;
  updatedPlayer: Player;
}

export const checkValid = ({
  gameStep,
  gameStepFn,
  response,
  player,
}: CheckValidProps): GameStepVerification => {
  const { valid, invalid } = gameStep;

  // if there's an invalid match, return it
  // if there's a valid match return that
  // otherwise just return failure

  const invalidMatch = invalid.find(({ answer }: InvalidStep) =>
    checkAnswerMatch({ answer, response, player })
  );
  if (invalidMatch) {
    return {
      invalidMessage: invalidMatch.message,
      gameStep,
      gameStepFn,
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
    return { gameStepFn: validMatch.nextStep, gameStep: validMatch.nextStep(player), updatedPlayer: player };
  }

  return {
    error: `You cannot ${response}`,
    gameStepFn,
    gameStep,
    updatedPlayer: player,
  };
};