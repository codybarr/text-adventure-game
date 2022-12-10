import { WET } from "./conditions.ts";
import { MATCHES, HATCHET_ITEM } from "./items.ts";

export const CHEST = () => ({
  message:
    "You smash the lock on the chest and it opens! Inside you see gold and a sword.",
  valid: [],
  invalid: [],
});

export const HATCHET = () => ({
  message: "You pick up the hatchet.",
  valid: [
    {
      answer: ["smash hit attack", "lock chest"],
      nextStep: CHEST,
    },
  ],
  invalid: [],
});

export const MERMAID = () => ({
  message:
    'As you bravely approach the creature you hear a soft beautiful voice begin singing. You take a closer look at the creature and you notice its long feminine hair and fish tail. It sings, "Is it you? Is that you? The one to bring about the truth?"',
  valid: [],
  invalid: [],
});

export const MERMAID_SURFACES = () => ({
  message:
    "As you reach the surface and desperately fill your lungs with air, you suddenly see a creature shoot up out of the water and beach itself on a large rock outside of the pool.",
  valid: [
    {
      answer: ["swim go approach", "shore creature it"],
      nextStep: MERMAID,
    },
  ],
  invalid: [],
});

export const DROWNED = () => ({
  message: "You've Drowned.",
});

export const SHADOW_SIGHTING = () => ({
  message:
    "You swim towards the shadow. As you do, it turns and reveals an eerie side profile and a sword-like tail. You're almost out of air!",
  valid: [
    {
      answer: ["swim get", "surface up air"],
      nextStep: MERMAID_SURFACES,
    },
  ],
  invalid: [
    {
      answer: ["attack", "it tail creature"],
      nextStep: DROWNED,
    },
  ],
});

export const BACK_TO_SHORE = () => ({
  message:
    "With one sweeping motion you kick back up to the surface and race back to the shore. You get out and walk back to where you woke up.",
  valid: [
    {
      answer: ["jump enter swim dive wade", "pool water"],
      nextStep: POOL,
    },
    {
      answer: ["light", "match"],
      nextStep: MATCH,
    },
  ],
  invalid: [
    {
      answer: ["pick pickup grab", "torch"],
      message: "There are no torches.",
    },
  ],
});

export const POOL_DEPTHS = () => ({
  message:
    "You take a deep breath and dive down into the depths of the pool. You see a faint shadow approaching you slowly.",
  valid: [
    {
      answer: ["approach stay wait towards", "shadow figure it"],
      nextStep: SHADOW_SIGHTING,
    },
    {
      answer: ["swim get", "away surface shore"],
      nextStep: BACK_TO_SHORE,
    },
  ],
  invalid: [],
});

export const POOL = () => ({
  message: "You enter the pool of water.",
  valid: [
    {
      answer: ["dive swim", "under water surface down bottom"],
      nextStep: POOL_DEPTHS,
    },
  ],
  invalid: [],
});

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
});

export const BEGIN = ({ inventory }) => {
  let valid = [
    {
      answer: ["jump enter swim dive wade in", "pool water"],
      nextStep: POOL,
      conditions: [WET],
      removeFromInventory: [MATCHES],
    },
  ];

  if (inventory.some((item) => item.name === MATCHES.name)) {
    valid.push({
      answer: ["light", "match"],
      nextStep: MATCH,
      conditions: [],
      removeFromInventory: [],
    });
  }

  return {
    message:
      "You awaken in a dark, damp cave. You are sitting by a pool of water.",
    valid,
    invalid: [
      {
        answer: ["pick pickup grab", "torch"],
        message: "There are no torches.",
      },
    ],
  };
};