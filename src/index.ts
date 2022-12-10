import {
  bgGreen,
  black,
  red,
  brightCyan,
  white,
} from "https://deno.land/std@0.162.0/fmt/colors.ts";

import { clear } from "https://deno.land/x/clear/mod.ts";

import * as GAME from "./game.ts";
import { MATCHES } from "./items.ts";
import { logPlayer, evaluateResponse } from "./logic.ts";

const QUESTION = "What would you like to do?";

let loop = true;
let player = { conditions: [], inventory: [MATCHES] };
let getGameStep = GAME.BEGIN;
let invalidMessage = '';
let error = '';

clear(true);

// game loop
while (loop) {
  const gameStep = getGameStep(player);

  logGameStepMessage(gameStep);

  logInvalidMessage();

  logErrorMessage();

  logPlayer(player);

  const response = prompt(brightCyan(QUESTION));

  const {
    error: newError,
    getGameStep: newgetGameStep,
    invalidMessage: newInvalidMessage,
    updatedPlayer,
  } = evaluateResponse({ getGameStep, response, player });

  getGameStep = newgetGameStep;
  player = updatedPlayer;
  invalidMessage = newInvalidMessage;
  error = newError;

}

function logGameStepMessage({ message }) {
  console.log("\n");
  console.log(bgGreen(black(message)));
}

function logInvalidMessage() {
  if (invalidMessage) {
    console.log("\n");
    console.log(red(invalidMessage));
  }
}

function logErrorMessage() {
  if (error) {
    console.log("\n");
    console.log(red(error));
  }
}