export interface GameState {
  invalidMessage?: string
  errorMessage?: string
  getGameStep: Function
  player: Player
}

export interface AnswerResponse {
  player?: Player,
  answer: string[]
  response: string,
}

export interface Step {
  answer: string[]
  message: string
}

export interface ValidStep extends Step {
  nextStep: string
}

export interface InvalidStep extends Step { }

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

export interface EvaluateResponseProps {
  getGameStep: Function
  response: string
  player: Player
}

export interface GameStepEvaluation {
  updatedInvalidMessage?: string
  updatedErrorMessage?: string
  updatedGetGameStep: Function
  updatedPlayer: Player
} 
