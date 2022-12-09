import {
  bgGreen,
  black,
  red,
  white,
} from "https://deno.land/std@0.162.0/fmt/colors.ts";

import { clear } from "https://deno.land/x/clear/mod.ts";

import * as GAME from "./game.ts";
import { MATCHES } from "./items.ts";
import { logPlayer, checkValid } from "./logic.ts";

const QUESTION = "What would you like to do?";

let loop = true;
let player = { conditions: [], inventory: [MATCHES] };
let gameStepFn = GAME.BEGIN;
let gameStep = GAME.BEGIN(player);

clear(true);

// game loop
while (loop) {
  console.log(bgGreen(black(gameStep.message)));
  console.log("\n");
  logPlayer(player);

  const response = prompt(white(QUESTION));

  const {
    error,
    gameStepFn: newGameStepFn,
    invalidMessage,
    updatedPlayer,
  } = checkValid({ gameStep, gameStepFn, response, player });

  if (invalidMessage) {
    console.log(red(invalidMessage));
  }

  player = updatedPlayer;

  if (error) {
    console.log(red(error));
  }

  console.log("\n");

  gameStepFn = newGameStepFn;
  gameStep = newGameStepFn(player);
}