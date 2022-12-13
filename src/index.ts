import {
  brightCyan,
} from "https://deno.land/std@0.162.0/fmt/colors.ts";

import { clear } from "https://deno.land/x/clear/mod.ts";

import * as GAME from "./game.ts";
import { MATCHES_ITEM } from "./items.ts";
import { logPlayer, logGameStepMessage, logInvalidMessage, logError } from "./logHelpers.ts";
import { evaluateResponse } from "./logic.ts";

clear(true);

const QUESTION = "What would you like to do?";
const STARTING_ITEMS = [MATCHES_ITEM];

let gameState = {
  getGameStep: GAME.BEGIN,
  player: { conditions: [], inventory: STARTING_ITEMS },
  invalidMessage: '',
  error: ''
}

let loop = true;
while (loop) {
  const { getGameStep, player, error, invalidMessage } = gameState;
  const gameStep = getGameStep(player);
  logGameStepMessage(gameStep);

  logInvalidMessage(invalidMessage);
  logError(error);
  logPlayer(player);

  const response = prompt(brightCyan(QUESTION));

  const {
    error: updatedError,
    getGameStep: updatedGetGameStep,
    invalidMessage: updatedInvalidMessage,
    updatedPlayer,
  } = evaluateResponse({ getGameStep, response, player });

  gameState = {
    getGameStep: updatedGetGameStep,
    player: updatedPlayer,
    invalidMessage: updatedInvalidMessage,
    error: updatedError,
  }
}