import React from 'react'
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils'

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup()
    createUserDocumentFromAuth(user)
    const userDocRef = await createUserDocumentFromAuth(user)

    // const response = await signInWithGooglePopup()

    // console.log(response)
  }

  /**
   *  BUG on console shown:
   *  Uncaught (in promise) FirebaseError: Firebase: Error (auth/    popup-closed-by-user).   at createErrorInternal
   *
   */

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    </div>
  )
}

export default SignIn
