import * as React from 'react'
import { UserContext } from '../../context/UserProvider'
import MainLayout from '../../layouts/MainLayout'
import User from '../../components/User'
import Button from '../../components/Button'
import styles from './giveFeedback.module.css'
import { useHistory } from 'react-router-dom'
import { FeedbackContext } from '../../context/FeedbackProvider'
import { AccountContext } from '../../context/AccountProvider'

const GiveFeedback = () => {
  const users = React.useContext(UserContext)
  const feedbacks = React.useContext(FeedbackContext)
  const currentUser = React.useContext(AccountContext)

  const history = useHistory()

  const userIdsWithFeedback = React.useMemo(() => {
    return feedbacks
      ? feedbacks
          .filter((feedback) => feedback.from.id === currentUser?.id)
          .map((feedback) => feedback.to.id)
      : []
  }, [currentUser?.id, feedbacks])

  return (
    <MainLayout loggedIn>
      <div className={styles.wrapper}>
        <h1>Share Feedback</h1>
        {users && users.length > 0 && (
          <ul className={styles.users}>
            {users.map((user) => (
              <li key={user.id} className={styles.user}>
                <User name={user.name} avatarUrl={user.avatarUrl} />
                <span style={{ flex: 1 }} />
                {userIdsWithFeedback.includes(user.id) ? (
                  <Button
                    onClick={() => {
                      history.push(`/share-feedback/submissions/${user.id}`)
                    }}
                    secondary
                    customStyle={{ width: 175, padding: '12px 10px' }}
                  >
                    View Submissions
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      history.push(`/share-feedback/user/${user.id}`)
                    }}
                    customStyle={{ width: 175 }}
                  >
                    Fill out
                  </Button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </MainLayout>
  )
}

export default GiveFeedback
