import React, { useEffect, useState } from 'react'
import { getRedirectResult } from 'firebase/auth'

import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup()
    createUserDocumentFromAuth(user)
    const userDocRef = await createUserDocumentFromAuth(user)

    // const response = await signInWithGooglePopup()

    // console.log(response)
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <SignUpForm />
    </div>
  )
}

export default SignIn
