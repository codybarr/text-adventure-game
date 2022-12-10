import {
  brightCyan,
} from "https://deno.land/std@0.162.0/fmt/colors.ts";

import { clear } from "https://deno.land/x/clear/mod.ts";

import * as GAME from "./game.ts";
import { MATCHES_ITEM } from "./items.ts";
import { logPlayer, logGameStepMessage, logInvalidMessage, logErrorMessage } from "./logHelpers.ts";
import { evaluateResponse } from "./logic.ts";

clear(true);

const QUESTION = "What would you like to do?";
const STARTING_ITEMS = [MATCHES_ITEM];

let getGameStep = GAME.BEGIN;
let player = { conditions: [], inventory: STARTING_ITEMS };
let invalidMessage, error = '';

let loop = true;
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