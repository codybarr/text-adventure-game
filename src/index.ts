import {
  brightCyan,
} from "https://deno.land/std@0.162.0/fmt/colors.ts";

import { clear } from "https://deno.land/x/clear/mod.ts";

import * as GAME from "./game.ts";
import { MATCHES } from "./items.ts";
import { logPlayer, logGameStepMessage, logInvalidMessage, logErrorMessage } from "./logHelpers.ts";
import { evaluateResponse } from "./logic.ts";

const QUESTION = "What would you like to do?";

let loop = true;

let getGameStep = GAME.BEGIN;
let player = { conditions: [], inventory: [MATCHES] };

let invalidMessage, error = '';

clear(true);

// game loop
while (loop) {
  const gameStep = getGameStep(player);
  logGameStepMessage(gameStep);

  logInvalidMessage(invalidMessage);
  logErrorMessage(error);
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