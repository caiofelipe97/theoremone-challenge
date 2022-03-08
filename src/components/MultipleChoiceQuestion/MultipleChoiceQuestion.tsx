import styles from './multipleChoiceQuestion.module.css'
import * as React from 'react'
import classnames from 'classnames'

type MultipleChoiceQuestionProps = {
  value: number | string | null
  onChangeValue: (value: string) => void
  options: {
    label: string
    value: number
  }[]
}

const MultipleChoiceQuestion = (props: MultipleChoiceQuestionProps) => {
  const { options, onChangeValue, value } = props
  return (
    <div className={styles.container}>
      {options.map((option) => (
        <button
          key={option.label}
          className={classnames(styles.option, {
            [styles.active]: value === option.label,
          })}
          onClick={() => onChangeValue(option.label)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default MultipleChoiceQuestion
