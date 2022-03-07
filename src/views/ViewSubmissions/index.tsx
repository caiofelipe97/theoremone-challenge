import * as React from 'react'
import { AiOutlineLeft } from 'react-icons/ai'
import { useHistory, useParams } from 'react-router-dom'
import ScaleAnswer from '../../components/ScaleAnswer'
import { AccountContext } from '../../context/AccountProvider'
import { FeedbackContext } from '../../context/FeedbackProvider'
import { UserT } from '../../context/types'
import { UserContext } from '../../context/UserProvider'
import MainLayout from '../../layouts/MainLayout'
import styles from './viewSubmissions.module.css'

interface ViewSubmissionsRouteParams {
  userId: string
}

const ViewSubmissions = () => {
  const users = React.useContext(UserContext)
  const feedbacks = React.useContext(FeedbackContext)
  const currentUser = React.useContext(AccountContext)
  const [feedbackUser, setFeedbackUser] = React.useState<UserT | null>(null)
  const history = useHistory()
  let { userId } = useParams<ViewSubmissionsRouteParams>()

  React.useEffect(() => {
    if (userId && users) {
      const user = users?.find((user) => user.id === userId)
      if (user) {
        setFeedbackUser(user)
      } else {
        history.push('/share-feedback/not-found')
      }
    } else {
      history.push('/share-feedback/not-found')
    }
  }, [history, userId, users])

  const userFeedback = React.useMemo(() => {
    return feedbacks
      ? feedbacks.find(
          (feedback) =>
            feedback.from.id === currentUser?.id &&
            feedback.to.id === feedbackUser?.id,
        )
      : null
  }, [currentUser?.id, feedbackUser?.id, feedbacks])

  const handleBackToFeedbacks = React.useCallback(() => {
    history.goBack()
  }, [history])

  return (
    <MainLayout loggedIn>
      <div className={styles.wrapper}>
        <button className={styles.back} onClick={handleBackToFeedbacks}>
          <AiOutlineLeft
            className={styles.backIcon}
            color={'#59636e'}
            size={24}
          />
          Back
        </button>
        <div className={styles.container}>
          <h2 className={styles.title}>{feedbackUser?.name}'s Feedback</h2>
          {userFeedback && userFeedback.questionAnswers.length > 0 ? (
            <ul className={styles.questions}>
              {userFeedback.questionAnswers.map((questionAnswer) => (
                <li key={questionAnswer.questionId} className={styles.question}>
                  <span className={styles.questionLabel}>
                    {questionAnswer.questionLabel}
                  </span>
                  <div className={styles.questionAnswerContainer}>
                    {questionAnswer.answer === null ? (
                      <span className={styles.skipped}>SKIPPED</span>
                    ) : questionAnswer.questionType === 'scale' ? (
                      <ScaleAnswer value={questionAnswer.answer} />
                    ) : questionAnswer.questionType === 'text' ||
                      questionAnswer.questionType === 'multipleChoice' ? (
                      <span className={styles.questionLabel}>
                        {questionAnswer.answer}
                      </span>
                    ) : (
                      <span>Invalid Answer</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.title}>
              Sorry, there's no feedback submissions for this user
            </p>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export default ViewSubmissions
