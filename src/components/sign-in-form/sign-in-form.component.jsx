// @ts-nocheck
import React, { useState, useContext } from 'react'

import './sign-in-form.styles.scss'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

// import { UserContext } from '../../contexts/user.context'

import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils'

const defaultFormFields = {
  email: '',
  password: ''
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  // const { setCurrentUser } = useContext(UserContext)

  // console.log(formFields)

  const signInWithGoogle = async () => {
    await signInWithGooglePopup()

    // const { user } = await signInWithGooglePopup()
    // await createUserDocumentFromAuth(user) // => move to user.context.jsx
  }

  /** clears the form upon clicking the sign-up button */
  const resetFormField = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await signInAuthUserWithEmailAndPassword(email, password)

      // setCurrentUser(user)

      // const { user } = await signInAuthUserWithEmailAndPassword(email, password)

      // const response = await signInAuthUserWithEmailAndPassword(email, password)
      // console.log(response)

      resetFormField()
    } catch (error) {
      /*if user doesn't exists in firebase using switch statement */
      switch (error.code) {
        /* check if password doesn't match with the email */
        case 'auth/wrong-password':
          alert('wrong password for email')
          break /* break if the case is meet the condition*/
        /* check if inputted email and password exist if it does not exist throw and alert */
        case 'auth/user-not-found':
          alert('no user associated with this email address')
          break
        default:
          console.log(error)
      }

      /* if password is incorrect for email using if statement */

      // if (error.code === 'auth/wrong-password') {
      //   alert('Wrong password')
      // }
      // console.log(error)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    event.preventDefault()

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          name='email'
          value={email}
          onChange={handleChange}
          type='email'
          required
        />

        <FormInput
          label='Password'
          name='password'
          value={password}
          onChange={handleChange}
          type='password'
          required
        />
        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>

          {/* Note: without type='button' at <Button type="">Google Sign in<Button> upon clicking it  the <Button>Sign In</Button> will also fire and its error switch will trigger case 'auth/wrong-password':  and show alert in UI wrong passwrod for email*/}
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
