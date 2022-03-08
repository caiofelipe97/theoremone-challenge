import styles from './scaleAnswer.module.css'
import * as React from 'react'
import classnames from 'classnames'

type ScaleAnswerProps = {
  value: number | string | null
}

const ScaleAnswer = ({ value }: ScaleAnswerProps) => {
  return (
    <div className={styles.scaleContainer}>
      <button
        className={classnames(styles.scale, {
          [styles.active]: value && value >= 1,
        })}
      ></button>
      <button
        className={classnames(styles.scale, {
          [styles.active]: value && value >= 2,
        })}
      ></button>
      <button
        className={classnames(styles.scale, {
          [styles.active]: value && value >= 3,
        })}
      ></button>
      <button
        className={classnames(styles.scale, {
          [styles.active]: value && value >= 4,
        })}
      ></button>
      <button
        className={classnames(styles.scale, {
          [styles.active]: value && value >= 5,
        })}
      ></button>
      <button
        className={classnames(styles.scale, {
          [styles.active]: value && value >= 6,
        })}
      ></button>
      <button
        className={classnames(styles.scale, {
          [styles.active]: value && value >= 7,
        })}
      ></button>
      <button
        className={classnames(styles.scale, {
          [styles.active]: value && value >= 8,
        })}
      ></button>
      <button
        className={classnames(styles.scale, {
          [styles.active]: value && value >= 9,
        })}
      ></button>
      <button
        className={classnames(styles.scale, {
          [styles.active]: value && value === 10,
        })}
      ></button>
    </div>
  )
}

export default ScaleAnswer
