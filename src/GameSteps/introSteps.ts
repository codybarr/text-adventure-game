import { WET } from "../conditions.ts";
import { HATCHET_ITEM, MATCHES_ITEM } from '../items.ts'
import { POOL } from "./poolSteps.ts";

export const CHEST = () => ({
  message:
    "You smash the lock on the chest and it opens! Inside you see gold and a sword.",
  valid: [],
  invalid: [],
})

export const HATCHET = () => ({
  message: "You pick up the hatchet.",
  valid: [
    {
      answer: ["smash hit attack", "lock chest"],
      nextStep: CHEST,
    },
  ],
  invalid: [],
})

export const MATCH = () => ({
  message:
    "You light a match. The cave glows dimly. You see a chest in the corner, but it is locked. You also see a small hatchet.",
  valid: [
    {
      answer: ["use grab pickup pick take", "hatchet axe"],
      nextStep: HATCHET,
      addToInventory: [HATCHET_ITEM],
    },
  ],
  invalid: [],
})

export const BEGIN = () => {
  return {
    message:
      "You awaken in a dark, damp cave. You are sitting by a pool of water.",
    valid: [
      {
        answer: ["jump enter swim dive wade in", "pool water"],
        nextStep: POOL,
        conditions: [WET],
        removeFromInventory: [MATCHES_ITEM],
      },
      {
        answer: ["light", "match"],
        nextStep: MATCH,
        conditions: [],
        removeFromInventory: [],
      }
    ],
    invalid: [
      {
        answer: ["pick pickup grab", "torch"],
        message: "There are no torches.",
      },
    ],
  }
}