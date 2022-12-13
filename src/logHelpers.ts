import { Condition, Item, Player } from "./types.ts";
import {
  bgGreen,
  black,
  red,
  white,
  italic
} from "https://deno.land/std@0.162.0/fmt/colors.ts";

export const logPlayer = (player: Player): void => {
  const { conditions, inventory } = player;

  console.log("\n");

  if (conditions.length) {
    console.log(italic(white(`You are ${formatConditionsList(conditions)}`)));
  }
  if (inventory.length) {
    console.log(italic(white(`You have ${formatInventoryList(inventory)}`)));
  }
};

function formatConditionsList(conditions: Condition[]) {
  const shouldLogAnd = (index: number) => (index === conditions.length - 1) && conditions.length > 1;
  return conditions.reduce(
    (prev, curr, index) => `${prev}${index !== 0 ? ", " : ""}${shouldLogAnd(index) ? 'and ' : ''}${curr.name}`,
    ""
  );
}

function formatInventoryList(inventory: Item[]) {
  return inventory
    .map(({ plural, name }: Item) => `${plural ? "" : "a "}${name}`)
    .join(", ");
}

export const logGameStepMessage = (message: string ) => {
  console.log("\n");
  console.log(bgGreen(black(message)));
}

export const logInvalidMessage = (invalidMessage: string) => {
  if (invalidMessage) {
    console.log("\n");
    console.log(red(invalidMessage));
  }
}

export const logError = (errorMessage: string) => {
  if (errorMessage) {
    console.log("\n");
    console.log(red(errorMessage));
  }
}