import { checkAnswerMatch } from '../logic.ts'
import { assertEquals } from 'https://deno.land/std@0.162.0/testing/asserts.ts'

Deno.test('checkAnswerMatch should match a correct answer', () => {
  const answer = ['jump enter swim', 'pool water']
  const response = 'Jump into water'

  const actual = checkAnswerMatch({ answer, response })
  assertEquals(actual, true)
})

Deno.test('checkAnswerMatch should NOT match an incorrect answer', () => {
  const answer = ['jump enter swim', 'pool water']
  const response = 'Jump into lava'

  const actual = checkAnswerMatch({ answer, response })
  assertEquals(actual, false)
})
