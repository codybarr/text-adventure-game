export interface AnswerResponse {
  answer: string[]
  response: string
}

export interface Step {
  answer: string[]
  message: string
}

export interface ValidStep extends Step {
  advanceTo: string
}

export interface InvalidStep extends Step {}

export interface GameStep {
  message: string
  invalid: InvalidStep[]
  valid: ValidStep[]
}

export interface Player {
  conditions: Condition[]
  inventory: Item[]
}

export interface Condition {
  name: string
}

export interface Item {
  name: string
  plural: boolean
}