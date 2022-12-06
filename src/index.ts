import {
  bgGreen,
  black,
  red,
  white,
} from 'https://deno.land/std@0.162.0/fmt/colors.ts'

import { clear } from 'https://deno.land/x/clear/mod.ts'

import * as GAME from './game.ts'
import { logPlayer, checkValid } from './logic.ts'

const QUESTION = 'What would you like to do?'

let loop = true
let gameStep = GAME.BEGIN
let player = { conditions: [], inventory: [] }

clear(true)

// game loop
while (loop) {
  console.log(bgGreen(black(gameStep.message)))
  logPlayer(player)

  const response = prompt(white(QUESTION))

  const { error, gameStep: newGameStep } = checkValid({ gameStep, response })

  if (error) {
    console.log(red(error))
  }

  console.log('\n')

  gameStep = newGameStep
}
