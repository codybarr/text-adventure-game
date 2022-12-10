import { Condition, Item, Player } from "./types.ts";
import { white } from "https://deno.land/std@0.162.0/fmt/colors.ts";

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