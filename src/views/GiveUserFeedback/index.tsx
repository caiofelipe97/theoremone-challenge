import * as React from 'react'
import { UserContext } from '../../context/UserProvider'
import MainLayout from '../../layouts/MainLayout'
import Question from '../../components/Question'

import styles from './giveUserFeedback.module.css'
import { UserT } from '../../context/types'
import { useParams, useHistory } from 'react-router-dom'
import { AiOutlineLeft } from 'react-icons/ai'
import {
  Question2T,
  QuestionContext,
  QuestionT,
} from '../../context/QuestionProvider'
import {
  DispatchFeedbackContext,
  QuestionAnswerT,
} from '../../context/FeedbackProvider'
import { AccountContext } from '../../context/AccountProvider'

interface GiveUserFeedbackRouteParams {
  userId: string
}

const GiveUserFeedback = () => {
  const feedbackDispatch = React.useContext(DispatchFeedbackContext)

  const users = React.useContext(UserContext)
  const questions = React.useContext(QuestionContext)
  const currentUser = React.useContext(AccountContext)

  const [selectedUser, setSelectedUser] = React.useState<UserT | null>(null)
  const [currentQuestion, setCurrentQuestion] = React.useState<
    QuestionT | Question2T | null
  >(null)
  const [questionIndex, setQuestionIndex] = React.useState<number>(0)

  const [answers, setAnswers] = React.useState<QuestionAnswerT[]>([])

  let { userId } = useParams<GiveUserFeedbackRouteParams>()
  let history = useHistory()

  React.useEffect(() => {
    if (userId && users) {
      const user = users.find((userObj) => userObj.id === userId)
      if (user) {
        setSelectedUser(user)
      } else {
        history.push('/share-feedback/not-found')
      }
    } else {
      history.push('/share-feedback/not-found')
    }
  }, [history, userId, users])

  React.useEffect(() => {
    if (questions && questions.length > 0) {
      setCurrentQuestion(questions[0])
      setQuestionIndex(0)
    }
  }, [questions])

  const handleNextQuestion = React.useCallback(
    (questionAnswer: QuestionAnswerT) => {
      let nextQuestionIndex = questionIndex + 1
      if (questions && questions[nextQuestionIndex]) {
        setCurrentQuestion(questions[nextQuestionIndex])
        setQuestionIndex(nextQuestionIndex)
      }
      setAnswers([...answers, questionAnswer])
    },
    [answers, questionIndex, questions],
  )

  const handlePreviousQuestion = React.useCallback(() => {
    const previousAnswers = answers.splice(questionIndex, 1)
    const previousQuestionIndex = questionIndex - 1
    if (questions && questions[previousQuestionIndex]) {
      setCurrentQuestion(questions[previousQuestionIndex])
      setQuestionIndex(previousQuestionIndex)
    }
    setAnswers(previousAnswers)
  }, [answers, questionIndex, questions])

  const handleSubmitFeedback = React.useCallback(
    (lastQuestionAnswer: QuestionAnswerT) => {
      const feedback = {
        from: currentUser,
        to: selectedUser,
        questionAnswers: [...answers, lastQuestionAnswer],
        read: false,
      }
      feedbackDispatch({
        action: 'add',
        payload: feedback,
      })
      history.push('/share-feedback/thank-you')
    },
    [answers, currentUser, feedbackDispatch, history, selectedUser],
  )

  const handleBackToFeedbacks = React.useCallback(() => {
    history.goBack()
  }, [history])

  const totalQuestions = React.useMemo(() => {
    return questions?.length ? questions?.length : 0
  }, [questions?.length])

  return (
    <MainLayout loggedIn>
      <div className={styles.wrapper}>
        <button className={styles.back} onClick={handleBackToFeedbacks}>
          <AiOutlineLeft
            className={styles.backIcon}
            color={'#59636e'}
            size={15}
          />
          Back
        </button>
        <div className={styles.questionHeader}>
          <div>
            <p className={styles.questionLabel}>{currentQuestion?.label}</p>
            <p className={styles.feedbackInfo}>
              Share your feedback to {selectedUser?.name}
            </p>
          </div>
          <img
            className={styles.userAvatar}
            src={selectedUser?.avatarUrl}
            alt="User avatar"
          />
        </div>

        {currentQuestion && (
          <Question
            question={currentQuestion}
            handlePreviousQuestion={handlePreviousQuestion}
            handleNextQuestion={handleNextQuestion}
            handleSubmitFeedback={handleSubmitFeedback}
            hasPreviousQuestion={questionIndex > 0}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
          />
        )}
      </div>
    </MainLayout>
  )
}

export default GiveUserFeedback
