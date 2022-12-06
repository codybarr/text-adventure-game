export const CHEST = {
  message:
    'You smash the lock on the chest and it opens! Inside you see gold and a sword.',
  valid: [],
  invalid: [],
}

export const HATCHET = {
  message: 'You pick up the hatchet.',
  valid: [
    {
      answer: ['smash hit attack', 'lock chest'],
      nextStep: CHEST,
    },
  ],
  invalid: [],
}

export const POOL = {
  message: 'You enter the pool of water.',
  valid: [],
  invalid: [],
}

const MATCH = {
  message:
    'You light a match. The cave glows dimly. You see a chest in the corner, but it is locked. You also see a small hatchet.',
  valid: [
    {
      answer: ['use grab pickup pick take', 'hatchet axe'],
      nextStep: HATCHET,
    },
  ],
  invalid: [],
}

export const BEGIN = {
  message:
    'You awaken in a dark, damp cave. You have matches and are sitting by a pool of water.',
  valid: [
    {
      answer: ['jump enter swim', 'pool water'],
      nextStep: POOL,
    },
    {
      answer: ['light', 'match'],
      nextStep: MATCH,
    },
  ],
  invalid: [
    {
      answer: ['pick pickup grab', 'torch'],
      message: 'There are no torches.',
    },
  ],
}
