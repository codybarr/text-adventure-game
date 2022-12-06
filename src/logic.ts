import * as GAME from './game.ts'
import {
  AnswerResponse,
  GameStep,
  InvalidStep,
  ValidStep,
  Player,
  Item,
  Condition,
} from './types.ts'

import { blue } from 'https://deno.land/std@0.162.0/fmt/colors.ts'

const answerMatchRegex = (answer: string[]) => {
  const [verbs, nouns] = answer

  //   /^(jump|enter|swim).+(pool|water)$/i
  return new RegExp(
    '^(' +
      verbs.split(' ').join('|') +
      ').+(' +
      nouns.split(' ').join('|') +
      ')$',
    'i'
  )
}

export const checkAnswerMatch = ({ answer, response }: AnswerResponse) => {
  const regex = answerMatchRegex(answer)
  return regex.test(response)
}

export const formatConditionsList = (conditions: Condition[]) =>
  conditions.join(', ')

export const formatInventoryList = (inventory: Item[]) =>
  inventory
    .map(({ plural, name }: Item) => `${plural ? '' : 'a '}${name}`)
    .join(', ')

export const logPlayer = (player: Player): void => {
  const { conditions, inventory } = player

  if (conditions.length > 0) {
    console.log(blue(`You are ${formatConditionsList(conditions)}`))
  }
  if (inventory.length > 0) {
    console.log(blue(`You have ${formatInventoryList(inventory)}`))
  }
}

export interface CheckValidProps {
  gameStep: GameStep
  response: string
}

interface GameStepVerification {
  message?: string
  gameStep: GameStep
}

export const checkValid = ({
  gameStep,
  response,
}: CheckValidProps): GameStepVerification => {
  const { valid, invalid } = gameStep

  // if there's an invalid match, return it
  // if there's a valid match return that
  // otherwise just return failure

  const invalidMatch = invalid.find(({ answer }: InvalidStep) =>
    checkAnswerMatch({ answer, response })
  )
  if (invalidMatch) {
    return { message: invalidMatch.message, gameStep }
  }

  const validMatch = valid.find(({ answer }: ValidStep) =>
    checkAnswerMatch({ answer, response })
  )
  if (validMatch) {
    return { gameStep: validMatch.nextStep }
  }

  return { error: `You cannot ${response}`, gameStep }
}
