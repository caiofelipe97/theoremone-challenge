import styles from './question.module.css'
import * as React from 'react'
import Button from '../Button'
import ScaleQuestion from '../ScaleQuestion'
import MultipleChoiceQuestion from '../MultipleChoiceQuestion'
import TextQuestion from '../TextQuestion'
import { QuestionAnswerT } from '../../context/FeedbackProvider'

type QuestionProps = {
  question: {
    id: string
    type: 'scale' | 'text' | 'multipleChoice'
    required: boolean
    label: string
    options?: {
      label: string
      value: number
    }[]
  }
  handlePreviousQuestion: () => void
  handleNextQuestion: (questionAnswer: QuestionAnswerT) => void
  handleSubmitFeedback: (questionAnswer: QuestionAnswerT) => void
  hasPreviousQuestion: boolean
  questionIndex: number
  totalQuestions: number
}

const Question = (props: QuestionProps) => {
  const [answer, setAnswer] = React.useState<string | number | null>(null)
  const {
    question,
    handlePreviousQuestion,
    handleSubmitFeedback,
    handleNextQuestion,
    hasPreviousQuestion,
    questionIndex,
    totalQuestions,
  } = props

  const handleChangeAnswer = React.useCallback(
    (questionAnswer: string | number) => {
      setAnswer(questionAnswer)
    },
    [],
  )

  const handleNext = React.useCallback(() => {
    handleNextQuestion({
      questionId: question.id,
      questionLabel: question.label,
      questionType: question.type,
      answer,
    })
    setAnswer(null)
  }, [answer, handleNextQuestion, question.id, question.label, question.type])

  const handleSubmit = React.useCallback(() => {
    handleSubmitFeedback({
      questionId: question.id,
      questionLabel: question.label,
      questionType: question.type,
      answer,
    })
  }, [answer, handleSubmitFeedback, question.id, question.label, question.type])

  const handlePrevious = React.useCallback(() => {
    handlePreviousQuestion()
    setAnswer(null)
  }, [handlePreviousQuestion])

  const handleSkip = React.useCallback(() => {
    if (totalQuestions === questionIndex + 1) {
      handleSubmitFeedback({
        questionId: question.id,
        questionLabel: question.label,
        questionType: question.type,
        answer: null,
      })
    } else {
      handleNextQuestion({
        questionId: question.id,
        questionLabel: question.label,
        questionType: question.type,
        answer: null,
      })
      setAnswer(null)
    }
  }, [
    handleNextQuestion,
    handleSubmitFeedback,
    question.id,
    question.label,
    question.type,
    questionIndex,
    totalQuestions,
  ])

  const RenderedQuestion = React.useMemo(() => {
    switch (question.type) {
      case 'scale':
        return (
          <ScaleQuestion onChangeValue={handleChangeAnswer} value={answer} />
        )
      case 'text':
        return (
          <TextQuestion onChangeValue={handleChangeAnswer} value={answer} />
        )
      case 'multipleChoice':
        return (
          <MultipleChoiceQuestion
            onChangeValue={handleChangeAnswer}
            value={answer}
            options={question.options ? question.options : []}
          />
        )
      default:
        return <p className={styles.invalidTxt}>Invalid question type</p>
    }
  }, [answer, handleChangeAnswer, question.options, question.type])

  return (
    <div className={styles.questionContainer}>
      {RenderedQuestion}
      <div className={styles.buttonsContainer}>
        <Button
          onClick={handlePrevious}
          secondary
          disabled={!hasPreviousQuestion}
          customStyle={{ width: 150, paddingLeft: 0, paddingRight: 0 }}
        >
          Previous
        </Button>
        {!question.required && (
          <Button
            onClick={handleSkip}
            secondary
            customStyle={{ width: 150, paddingLeft: 0, paddingRight: 0 }}
          >
            Skip
          </Button>
        )}
        {questionIndex === totalQuestions - 1 ? (
          <Button
            disabled={!answer}
            onClick={handleSubmit}
            customStyle={{ width: 150, paddingLeft: 0, paddingRight: 0 }}
          >
            Submit
          </Button>
        ) : (
          <Button
            disabled={!answer}
            onClick={handleNext}
            customStyle={{ width: 150, paddingLeft: 0, paddingRight: 0 }}
          >
            Next
          </Button>
        )}
      </div>
      <div>
        <progress value={questionIndex} max={totalQuestions} />
        <p className={styles.questionsCompleted}>Questions Completed</p>
        <span className={styles.progressText}>
          {questionIndex}/{totalQuestions}
        </span>
      </div>
    </div>
  )
}

export default Question
