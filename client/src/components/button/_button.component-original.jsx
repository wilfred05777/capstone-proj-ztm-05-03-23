import React from 'react'

import { BaseButton, GoogleSignInButton, InvertedButton } from './button.styles'

import './button.styles.scss'
/**
 * Different types of buttons
 *
 * default
 *
 * inverted
 *
 * google sign in
 */

const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted',
  default: 'btn-default'
}
const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  )
}

export default Button
