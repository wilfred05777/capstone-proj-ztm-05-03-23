import React, { useState } from 'react'

import { createAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields

  console.log(formFields)

  const handleSubmit = async (event) => {
    event.preventDefault()
    // challenge code here
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    event.preventDefault()

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={() => {}}>
        <label htmlFor='displayName'>Display Name</label>
        <input
          name='displayName'
          value={displayName}
          onChange={handleChange}
          type='text'
          required
        />

        <label htmlFor='email'>Email</label>
        <input
          name='email'
          value={email}
          onChange={handleChange}
          type='email'
          required
        />

        <label htmlFor=''>Password</label>
        <input
          name='password'
          value={password}
          onChange={handleChange}
          type='password'
          required
        />

        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input
          name='confirmPassword'
          value={confirmPassword}
          onChange={handleChange}
          type='password'
          required
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default SignUpForm
