import styles from './button.module.css'
import * as React from 'react'
import classnames from 'classnames'

type Props = {
  onClick: (se: React.SyntheticEvent) => void
  children: React.ReactNode
  secondary?: boolean
  customStyle?: Object
  disabled?: boolean
}

const Button = (props: Props) => {
  const { children, secondary, onClick, customStyle, disabled } = props

  return (
    <button
      className={classnames(styles.button, {
        [styles.secondaryButton]: secondary,
        [styles.disabledButton]: disabled,
      })}
      style={customStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
