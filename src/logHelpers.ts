import { Condition, Item, Player } from "./types.ts";
import {
  bgGreen,
  black,
  red,
  white
} from "https://deno.land/std@0.162.0/fmt/colors.ts";

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

function formatConditionsList(conditions: Condition[]) {
  return conditions.reduce(
    (prev, curr, index) => `${prev}${index !== 0 ? "," : ""}${curr.name}`,
    ""
  );
}

function formatInventoryList(inventory: Item[]) {
  return inventory
    .map(({ plural, name }: Item) => `${plural ? "" : "a "}${name}`)
    .join(", ");
}

export const logGameStepMessage = ({ message }) => {
  console.log("\n");
  console.log(bgGreen(black(message)));
}

export const logInvalidMessage = (invalidMessage) => {
  if (invalidMessage) {
    console.log("\n");
    console.log(red(invalidMessage));
  }
}

export const logErrorMessage = (error) => {
  if (error) {
    console.log("\n");
    console.log(red(error));
  }
}