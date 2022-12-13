import {
  brightCyan,
} from "https://deno.land/std@0.162.0/fmt/colors.ts"

import { clear } from "https://deno.land/x/clear/mod.ts"

import * as GAME from "./GameSteps/introSteps.ts"
import { MATCHES_ITEM } from "./items.ts"
import { logPlayer, logGameStepMessage, logInvalidMessage, logError } from "./logHelpers.ts"
import { evaluateResponse } from "./logic.ts"
import { GameState } from "./types.ts"

clear(true)

const QUESTION = "What would you like to do?"
const STARTING_ITEMS = [MATCHES_ITEM]

let gameState: GameState = {
  getGameStep: GAME.BEGIN,
  player: { conditions: [], inventory: STARTING_ITEMS },
  invalidMessage: '',
  errorMessage: '',
  history: []
}

let loop = true
while (loop) {
  const { getGameStep, player, errorMessage = '', invalidMessage = '', history } = gameState

  const gameStep = getGameStep({ player, history })
  logGameStepMessage(gameStep.message)

  logInvalidMessage(invalidMessage)
  logError(errorMessage)
  logPlayer(player)

  const response = prompt(brightCyan(QUESTION)) || 'fail. You got this!'

  const {
    updatedGetGameStep,
    updatedPlayer,
    updatedErrorMessage,
    updatedInvalidMessage,
  } = evaluateResponse({ getGameStep, response, player, history })

  gameState = {
    history: [
      ...gameState.history,
      gameStep
    ],
    getGameStep: updatedGetGameStep,
    player: updatedPlayer,
    invalidMessage: updatedInvalidMessage,
    errorMessage: updatedErrorMessage,
  }
}