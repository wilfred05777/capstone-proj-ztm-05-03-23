import React, { useEffect, useState } from 'react'

import './authentication.styles.scss'

import { getRedirectResult } from 'firebase/auth'

import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
import SignInForm from '../../components/sign-in-form/sign-in-form.component'

const Authentication = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup()
    createUserDocumentFromAuth(user)
    const userDocRef = await createUserDocumentFromAuth(user)

    // const response = await signInWithGooglePopup()

    // console.log(response)
  }

  return (
    <div className='authentication-container'>
      {/* <h1>Sign In Page</h1> */}
      {/* <button onClick={logGoogleUser}>Sign in with Google Popup</button> */}
      <SignInForm />
      <SignUpForm />
    </div>
  )
}

export default Authentication
