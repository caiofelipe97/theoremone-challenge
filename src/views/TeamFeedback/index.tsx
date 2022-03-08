import * as React from 'react'
import User from '../../components/User'
import { AccountContext } from '../../context/AccountProvider'
import {
  DispatchFeedbackContext,
  FeedbackContext,
  FeedbackT,
} from '../../context/FeedbackProvider'
import MainLayout from '../../layouts/MainLayout'
import styles from './teamFeedback.module.css'
import classnames from 'classnames'
import ScaleAnswer from '../../components/ScaleAnswer'
import NoFeedbackToDisplay from '../../components/NoFeedbackToDisplay'

const TeamFeedback = () => {
  const feedbacks = React.useContext(FeedbackContext)
  const currentUser = React.useContext(AccountContext)
  const feedbackDispatch = React.useContext(DispatchFeedbackContext)

  const [receivedFeedbacks, setReceivedFeedbacks] = React.useState<FeedbackT[]>(
    [],
  )

  const [selectedUserFeedback, setSelectedUserFeedback] =
    React.useState<FeedbackT | null>(null)

  React.useEffect(() => {
    const filteredFeedbacks = feedbacks?.filter(
      (feedback) => feedback.to.id === currentUser?.id,
    )
    setReceivedFeedbacks(filteredFeedbacks ? filteredFeedbacks : [])
    const selectedFeedback =
      filteredFeedbacks && filteredFeedbacks.length > 0
        ? filteredFeedbacks[0]
        : null

    setSelectedUserFeedback(selectedFeedback)
    if (selectedFeedback && !selectedFeedback.read) {
      feedbackDispatch({
        action: 'read',
        payload: selectedFeedback,
      })
    }
  }, [currentUser?.id, feedbackDispatch, feedbacks])

  const handleChangeSelectedUserFeedback = React.useCallback(
    (feedback: FeedbackT) => {
      setSelectedUserFeedback(feedback)
      if (!feedback.read) {
        feedbackDispatch({
          action: 'read',
          payload: feedback,
        })
      }
    },
    [feedbackDispatch],
  )

  return (
    <MainLayout loggedIn>
      {receivedFeedbacks && receivedFeedbacks.length > 0 ? (
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Team Feedback</h1>
          <div className={styles.feedbackContainer}>
            <ul className={styles.users}>
              <li>
                <h4 className={styles.feedbackGivenTxt}>Feedback received</h4>
              </li>
              {receivedFeedbacks.map((feedback) => (
                <li>
                  <button
                    className={classnames(styles.userButton, {
                      [styles.activeUser]:
                        selectedUserFeedback?.from.id === feedback.from.id,
                    })}
                    onClick={() => handleChangeSelectedUserFeedback(feedback)}
                  >
                    <User
                      key={feedback.from.id}
                      name={feedback.from.name}
                      avatarUrl={feedback.from.avatarUrl}
                      newFeedback={!feedback.read}
                    />
                  </button>
                </li>
              ))}
            </ul>
            <div className={styles.userFeedback}>
              <span className={styles.feedbackUserName}>
                {selectedUserFeedback?.from.name}'s Feedback
              </span>
              {selectedUserFeedback &&
                selectedUserFeedback.questionAnswers.length > 0 && (
                  <ul className={styles.questions}>
                    {selectedUserFeedback.questionAnswers.map(
                      (questionAnswer) => (
                        <li
                          key={questionAnswer.questionId}
                          className={styles.question}
                        >
                          <span className={styles.questionLabel}>
                            {questionAnswer.questionLabel}
                          </span>
                          <div className={styles.questionAnswerContainer}>
                            {questionAnswer.answer === null ? (
                              <span className={styles.skipped}>SKIPPED</span>
                            ) : questionAnswer.questionType === 'scale' ? (
                              <ScaleAnswer value={questionAnswer.answer} />
                            ) : questionAnswer.questionType === 'text' ||
                              questionAnswer.questionType ===
                                'multipleChoice' ? (
                              <span className={styles.questionLabel}>
                                {questionAnswer.answer}
                              </span>
                            ) : (
                              <span>Invalid Answer</span>
                            )}
                          </div>
                        </li>
                      ),
                    )}
                  </ul>
                )}
            </div>
          </div>
        </div>
      ) : (
        <NoFeedbackToDisplay />
      )}
    </MainLayout>
  )
}

export default TeamFeedback
