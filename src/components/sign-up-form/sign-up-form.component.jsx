// @ts-nocheck
import React, { useState, useContext } from 'react'

import './sign-up-form.styles.scss'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils'

import { UserContext } from '../../contexts/user.context'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields

  // functions are rerun using useContext hook
  const val = useContext(UserContext)

  console.log('hit')

  // console.log(formFields)

  /** clears the form upon clicking the sign-up button */
  const resetFormField = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // challenge code here
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    try {
      // const response = await createAuthUserWithEmailAndPassword(email, password)
      // console.log(response)
      const { user } = await createAuthUserWithEmailAndPassword(email, password)

      /** display null value fixes here */
      await createUserDocumentFromAuth(user, { displayName })

      alert('Successfully signed up!')

      resetFormField()
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use')
      } else {
        console.log('user creation encountered an error', error)
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    event.preventDefault()

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className='sign-up-container'>
      <h2>Don't Have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          name='displayName'
          value={displayName}
          onChange={handleChange}
          type='text'
          required
        />

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

        <FormInput
          label='Confirm Password'
          name='confirmPassword'
          value={confirmPassword}
          onChange={handleChange}
          type='password'
          required
        />
        <Button buttonType='default' type='submit'>
          Sign Up
        </Button>
        {/* <button type='submit'>Sign Up</button> */}
      </form>
    </div>
  )
}

export default SignUpForm
