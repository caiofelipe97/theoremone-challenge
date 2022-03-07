import * as React from 'react'
import User from '../../components/User'
import { AccountContext } from '../../context/AccountProvider'
import { FeedbackContext, FeedbackT } from '../../context/FeedbackProvider'
import MainLayout from '../../layouts/MainLayout'
import styles from './myFeedback.module.css'
import classnames from 'classnames'
import ScaleAnswer from '../../components/ScaleAnswer'

const MyFeedback = () => {
  const feedbacks = React.useContext(FeedbackContext)
  const currentUser = React.useContext(AccountContext)

  const [givenFeedbacks, setGivenFeedbacks] = React.useState<FeedbackT[]>([])

  const [selectedUserFeedback, setSelectedUserFeedback] =
    React.useState<FeedbackT | null>(null)

  React.useEffect(() => {
    const filteredFeedbacks = feedbacks?.filter(
      (feedback) => feedback.from.id === currentUser?.id,
    )
    setGivenFeedbacks(filteredFeedbacks ? filteredFeedbacks : [])
    setSelectedUserFeedback(
      filteredFeedbacks && filteredFeedbacks.length > 0
        ? filteredFeedbacks[0]
        : null,
    )
  }, [currentUser?.id, feedbacks])

  const handleChangeSelectedUserFeedback = React.useCallback(
    (feedback: FeedbackT) => {
      setSelectedUserFeedback(feedback)
    },
    [],
  )

  return (
    <MainLayout loggedIn>
      {givenFeedbacks && givenFeedbacks.length > 0 ? (
        <div className={styles.wrapper}>
          <h1 className={styles.title}>My Feedback</h1>
          <div className={styles.feedbackContainer}>
            <ul className={styles.users}>
              <li>
                <h4 className={styles.feedbackGivenTxt}>Feedback given</h4>
              </li>
              {givenFeedbacks.map((feedback) => (
                <li>
                  <button
                    className={classnames(styles.userButton, {
                      [styles.activeUser]:
                        selectedUserFeedback?.to.id === feedback.to.id,
                    })}
                    onClick={() => handleChangeSelectedUserFeedback(feedback)}
                  >
                    <User
                      key={feedback.to.id}
                      name={feedback.to.name}
                      avatarUrl={feedback.to.avatarUrl}
                    />
                  </button>
                </li>
              ))}
            </ul>
            <div className={styles.userFeedback}>
              <span className={styles.feedbackUserName}>
                {selectedUserFeedback?.to.name}'s Feedback
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
        <div className={styles.noFeedbackContainer}>
          <h1 className={styles.noFeedbackTitle}>No feedback to display 🔮</h1>
          <p className={styles.noFeedbackSubTitle}>
            There is no feedback to display at this time – check back in a bit!{' '}
          </p>
        </div>
      )}
    </MainLayout>
  )
}

export default MyFeedback
