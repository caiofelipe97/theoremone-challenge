import * as React from 'react'
import { UserT } from './types'

export type QuestionAnswerT = {
  questionId: string
  questionType: string
  questionLabel: string
  answer: number | string | null
}

export type FeedbackT = {
  from: UserT
  to: UserT
  questionAnswers: QuestionAnswerT[]
}

type DispatchFeedbackContextT = any

export const DispatchFeedbackContext =
  React.createContext<DispatchFeedbackContextT | null>(null)
export const FeedbackContext = React.createContext<FeedbackT[] | null>(null)

type SubmitFeedbackT = {
  action: 'add'
  payload: FeedbackT
}

const reducer = (
  state: FeedbackT[] | null,
  update: SubmitFeedbackT,
): FeedbackT[] | null => {
  if (update.action === 'add') {
    return state ? [...state, update.payload] : [update.payload]
  }
  return state
}

const UIProvider = ({ children }: { children: React.ReactNode }): any => {
  const [state, dispatch] = React.useReducer(reducer, [])
  console.log('feedbacks', state)

  return (
    <DispatchFeedbackContext.Provider value={dispatch}>
      <FeedbackContext.Provider value={state}>
        {children}
      </FeedbackContext.Provider>
    </DispatchFeedbackContext.Provider>
  )
}

export default UIProvider
