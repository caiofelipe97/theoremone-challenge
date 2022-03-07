import styles from './scaleQuestion.module.css'
import * as React from 'react'
import classnames from 'classnames'

type ScaleQuestionProps = {
  value: number | string | null
  onChangeValue: (value: number) => void
}

const ScaleQuestion = ({ value, onChangeValue }: ScaleQuestionProps) => {
  const [hoverValue, setHoverValue] = React.useState(0)

  return (
    <div className={styles.container}>
      <div className={styles.scaleContainer}>
        <button
          className={classnames(styles.scale, {
            [styles.active]:
              (value && value >= 1) || (hoverValue && hoverValue >= 1),
          })}
          onMouseOver={() => {
            setHoverValue(1)
          }}
          onMouseLeave={() => {
            setHoverValue(0)
          }}
          onClick={() => {
            onChangeValue(1)
          }}
        ></button>
        <button
          className={classnames(styles.scale, {
            [styles.active]:
              (value && value >= 2) || (hoverValue && hoverValue >= 2),
            [styles.oldActive]:
              hoverValue && hoverValue < 2 && value && value >= 2,
          })}
          onMouseOver={() => {
            setHoverValue(2)
          }}
          onMouseLeave={() => {
            setHoverValue(0)
          }}
          onClick={() => {
            onChangeValue(2)
          }}
        ></button>
        <button
          className={classnames(styles.scale, {
            [styles.active]:
              (value && value >= 3) || (hoverValue && hoverValue >= 3),
            [styles.oldActive]:
              hoverValue && hoverValue < 3 && value && value >= 3,
          })}
          onMouseOver={() => {
            setHoverValue(3)
          }}
          onMouseLeave={() => {
            setHoverValue(0)
          }}
          onClick={() => {
            onChangeValue(3)
          }}
        ></button>
        <button
          className={classnames(styles.scale, {
            [styles.active]:
              (value && value >= 4) || (hoverValue && hoverValue >= 4),
            [styles.oldActive]:
              hoverValue && hoverValue < 4 && value && value >= 4,
          })}
          onMouseOver={() => {
            setHoverValue(4)
          }}
          onMouseLeave={() => {
            setHoverValue(0)
          }}
          onClick={() => {
            onChangeValue(4)
          }}
        ></button>
        <button
          className={classnames(styles.scale, {
            [styles.active]:
              (value && value >= 5) || (hoverValue && hoverValue >= 5),
            [styles.oldActive]:
              hoverValue && hoverValue < 5 && value && value >= 5,
          })}
          onMouseOver={() => {
            setHoverValue(5)
          }}
          onMouseLeave={() => {
            setHoverValue(0)
          }}
          onClick={() => {
            onChangeValue(5)
          }}
        ></button>
        <button
          className={classnames(styles.scale, {
            [styles.active]:
              (value && value >= 6) || (hoverValue && hoverValue >= 6),
            [styles.oldActive]:
              hoverValue && hoverValue < 6 && value && value >= 6,
          })}
          onMouseOver={() => {
            setHoverValue(6)
          }}
          onMouseLeave={() => {
            setHoverValue(0)
          }}
          onClick={() => {
            onChangeValue(6)
          }}
        ></button>
        <button
          className={classnames(styles.scale, {
            [styles.active]:
              (value && value >= 7) || (hoverValue && hoverValue >= 7),
            [styles.oldActive]:
              hoverValue && hoverValue < 7 && value && value >= 7,
          })}
          onMouseOver={() => {
            setHoverValue(7)
          }}
          onMouseLeave={() => {
            setHoverValue(0)
          }}
          onClick={() => {
            onChangeValue(7)
          }}
        ></button>
        <button
          className={classnames(styles.scale, {
            [styles.active]:
              (value && value >= 8) || (hoverValue && hoverValue >= 8),
            [styles.oldActive]:
              hoverValue && hoverValue < 8 && value && value >= 8,
          })}
          onMouseOver={() => {
            setHoverValue(8)
          }}
          onMouseLeave={() => {
            setHoverValue(0)
          }}
          onClick={() => {
            onChangeValue(8)
          }}
        ></button>
        <button
          className={classnames(styles.scale, {
            [styles.active]:
              (value && value >= 9) || (hoverValue && hoverValue >= 9),
            [styles.oldActive]:
              hoverValue && hoverValue < 9 && value && value >= 9,
          })}
          onMouseOver={() => {
            setHoverValue(9)
          }}
          onMouseLeave={() => {
            setHoverValue(0)
          }}
          onClick={() => {
            onChangeValue(9)
          }}
        ></button>
        <button
          className={classnames(styles.scale, {
            [styles.active]:
              (value && value === 10) || (hoverValue && hoverValue === 10),
            [styles.oldActive]:
              hoverValue && hoverValue < 10 && value && value === 10,
          })}
          onMouseOver={() => {
            setHoverValue(10)
          }}
          onMouseLeave={() => {
            setHoverValue(0)
          }}
          onClick={() => {
            onChangeValue(10)
          }}
        ></button>
      </div>
      <p className={styles.scaleValue}>{value ? value : 0}/10</p>
    </div>
  )
}

export default ScaleQuestion
