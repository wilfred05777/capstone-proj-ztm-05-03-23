# capstone-proj-ztm-05-03-23

================================================================

<hr >

```js
/**
 * 101. Generalizing Form Input Component
 */

/**
 * sign-up-form.component.jsx
 **/
import FormInput from '../form-input/form-input.component'

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils'

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
    <div>
      <h1>Sign up with your email and password</h1>

      <form onSubmit={handleSubmit}>
        {/* Generalizing refactor the input all input to FormInput */}
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
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpForm

/**
 * form-input-component.jsx =============================================================
 */
import React from 'react'
import './form-input.styles.scss'

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className='group'>
      <input className='form-input' {...otherProps} />
      {label && (
        <label
          className={`${
            otherProps.value.length ? 'shrink' : ''
          } form-input-label`}
          htmlFor='displayName'
        >
          {label}
        </label>
      )}

      {/* <input className='form-input' {...otherProps} /> */}

      {/* <input
        name='displayName'
        value={displayName}
        onChange={changeHandler}
        type='text'
        required
      /> */}
    </div>
  )
}

export default FormInput
```

```scss
/**
 * form-input-styles.scss
 */
$sub-color: grey;
$main-color: black;

@mixin shrinkLabel {
  top: -14px;
  font-size: 12px;
  color: $main-color;
}

.group {
  position: relative;
  margin: 45px 0;

  .form-input {
    background: none;
    background-color: white;
    color: $sub-color;
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid $sub-color;
    margin: 25px 0;

    &:focus {
      outline: none;
    }
    /**
     *  ~ focus/select the next sibling
    */
    &:focus ~ .form-input-label {
      @include shrinkLabel();
    }
  }

  input[type='password'] {
    letter-spacing: 0.3em;
  }

  .form-input-label {
    color: $sub-color;
    font-size: 16px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 300ms ease all;

    &.shrink {
      @include shrinkLabel();
    }
  }
}
```

<hr >

```jsx
/*
 *100. Sign Up With Email + Password
 */

/**
 * firebase.utils.jsx({
 */

import { initializeApp } from 'firebase/app'

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBx5m2LdfOs7Cfy9C-4faVxC6NzSVzMWgc',
  authDomain: 'crwn-ecom-db-819ab.firebaseapp.com',
  projectId: 'crwn-ecom-db-819ab',
  storageBucket: 'crwn-ecom-db-819ab.appspot.com',
  messagingSenderId: '599007308317',
  appId: '1:599007308317:web:aae5689d03604ae4b6b4f4',
  measurementId: 'G-2R6LT2CYJ5'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

// sign providers like: facebook, google, twitter
const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {} // displayName, // null value- overwrites
  // additionalInformation = { displayName: ''}
) => {
  // protected my code if we don't received and argument userAuth from firestore it will terminate
  if (!userAuth) return

  const userDocRef = doc(db, 'user', userAuth.uid)

  console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot)
  console.log(userSnapshot.exists())

  // if user data does not exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      // create / set the document with the data from userAuth in my collection
      await setDoc(userDocRef, {
        displayName, // null value- overwrites
        email,
        createdAt,
        ...additionalInformation
      })
      // if user data exists
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }

  // return userSnapshot
  return userDocRef

  // pseudo code
  // if user data does not exist
  // create / set the document with the data from userAuth in my collection
  // if user data exists
  // return userSnapshot
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  // the general idea - in between protected if there is a change between firebase methods
  if (!email || !password) return

  return await createUserWithEmailAndPassword(auth, email, password)
}

/*
 * sign-up-form.component.js ================================================
 */

import React, { useState } from 'react'
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils'

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
    <div>
      <h1>Sign up with your email and password</h1>
      {/* <form onSubmit={() => {}}> */}
      <form onSubmit={handleSubmit}>
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
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpForm
```

<hr>

```jsx
/**
 * 100. Sign Up With Email + Password
 */
```

<hr>

```jsx
/*
 *99. Sign Up Form Pt.2
 */

/**
 * firebasse.utils.jsx
 */

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBx5m2LdfOs7Cfy9C-4faVxC6NzSVzMWgc',
  authDomain: 'crwn-ecom-db-819ab.firebaseapp.com',
  projectId: 'crwn-ecom-db-819ab',
  storageBucket: 'crwn-ecom-db-819ab.appspot.com',
  messagingSenderId: '599007308317',
  appId: '1:599007308317:web:aae5689d03604ae4b6b4f4',
  measurementId: 'G-2R6LT2CYJ5'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

// sign providers like: facebook, google, twitter
const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  // protected my code if we don't received and argument userAuth from firestore it will terminate
  if (!userAuth) return

  const userDocRef = doc(db, 'user', userAuth.uid)

  console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot)
  console.log(userSnapshot.exists())

  // if user data does not exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      // create / set the document with the data from userAuth in my collection
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
      // if user data exists
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }

  // return userSnapshot
  return userDocRef

  // pseudo code
  // if user data does not exist
  // create / set the document with the data from userAuth in my collection
  // if user data exists
  // return userSnapshot
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  // the general idea - in between protected if there is a change between firebase methods
  if (!email || !password) return

  return await createUserWithEmailAndPassword(auth, email, password)
}

/**
 * sign-up-form.component.jsx
 *
 */
```

<hr>

```jsx
/**
 * 98. Sign Up Form Pt.1
 * 1. add email provider in firestore -> firebase -> Authentication -> Sign-in method -> Add new provider
 *
 */

/* sign-up-form.components.jsx*/
import React, { useState } from 'react'

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
```

<hr>

```jsx
// 97. Sign In With Redirect
// sign-in.component.jsx file
// =================================================================
/**
 * -- Problems: with just signInWithGoogleRedirect()
    --- will only redirect after login but it won't record the state after comming to the /sign-In url
    --- to fix it we need React hooks useEffect and
 *
  import React, { useEffect } from 'react'
  import { getRedirectResult } from 'firebase/auth'
*/

/**
 * The main thing I wanted you to know was that there are multiple ways that you can provide different providers.
 *
 */

// side lessons for this video chapter: 97
import React, { useEffect, useState } from 'react'
import { getRedirectResult } from 'firebase/auth'

useEffect(async () => {
  const response = await getRedirectResult(auth)
  // console.log(response)

  if (response) {
    const userDocRef = await createUserDocumentFromAuth(response.user)
  }
}, [])

// [97-A] Explanation of the logGoogleRedirectUser button
// const logGoogleRedirectUser = async () => {
//   const { user } = await signInWithGoogleRedirect()
//   console.log({ user })
// }

/**
 *  BUG on console shown:
 *  Uncaught (in promise) FirebaseError: Firebase: Error (auth/    popup-closed-by-user).   at createErrorInternal
 *
 */

{
  /* Explanation [97-A] */
}
{
  /* <button onClick={logGoogleRedirectUser}>
        Sign in with Google Redirect without UseEffect
      </button> */
}
;<div>
  <button onClick={signInWithGoogleRedirect}>
    Sign in with Google Redirect with useEffect
  </button>
</div>

//================================================================
/**
 * fireabse.utils.js file
 */

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth'

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

// sign providers like: facebook, google, twitter
const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'user', userAuth.uid)

  console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot)
  console.log(userSnapshot.exists())

  // if user data does not exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      // create / set the document with the data from userAuth in my collection
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
      // if user data exists
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }

  // return userSnapshot
  return userDocRef

  // pseudo code
  // if user data does not exist
  // create / set the document with the data from userAuth in my collection
  // if user data exists
  // return userSnapshot
}
```

<hr>

```js
// 88. Styling for Navigation + Logo
// navigation.component.jsx
import React from 'react'

import { Fragment } from 'react'
// Link is just like an anchor tag link in a plain html
import { Link, Outlet } from 'react-router-dom'

/**
 * Vite and SVG rendering for navigation fixes and issues
 *
 * BUG on import { ReactComponent as CrwnLogo } from '/src/assets/images/crown.svg'
 *
 *
 * https://stackoverflow.com/questions/70309561/unable-to-import-svg-with-vite-as-reactcomponent
 *
 * !Solution!: just follow the link below to fix the issue
 * https://www.npmjs.com/package/vite-plugin-svgr
 *
 *
 */

import { ReactComponent as Logo } from '../../assets/images/crown.svg'

import './navigation.styles.scss'

// The top level component / template
const Navigation = () => {
  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to={'/'}>
          <Logo className='logo' />
        </Link>
        <div className='nav-links-container'>
          {/* Link behaves like an anchor tag link in a plain html */}
          <Link className='nav-link' to={'/shop'}>
            Shop
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation
```

<hr>

```js
// 87. React Router Link
// navigation.component.jsx
import React from 'react'
import { Fragment } from 'react'
// Link is just like an anchor tag link in a plain html
import { Link, Outlet } from 'react-router-dom'

// The top level component / template
const Navigation = () => {
  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to={'/'}>
          Logo
        </Link>
        <div className='links-container'>
          {/* Link behaves like an anchor tag link in a plain html */}
          <Link className='nav-link' to={'/shop'}>
            Shop
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation
```

<hr>

```js
// 86. Navigation Bar Component
// App.jsx
import React, { useState } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'

import './App.css'

import Home from './routes/home/home.components'

// The top level component / template
const Navigation = () => {
  return (
    <div>
      <div>
        <h1>I am the navigation</h1>
      </div>
      <Outlet />
    </div>
  )
}

const Shop = () => {
  return <h1>I am the shop page</h1>
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        {/* index is matching the as the base component  */}
        {/* <Route path='/home' element={<Home />} /> */}
        <Route path='shop' element={<Shop />} />
      </Route>
    </Routes>
  )
}

export default App
```

<hr>

```js
// lesson : 85. React Router Outlet
<Routes>
  <Route path='/home' element={<Home />}>
    <Route path='shop' element={<Shop />} />
    {/* /home/shop */}
  </Route>
  {/* code above - it is No longer a sibling but nested element -> Parent level add a <Outlet/> to render the nested which is /shop, because it will only render the parent level element. */}

  {/* <Route path='/' element={<Home />} /> */}
  {/* <Route path='/shop' element={<Shop />} /> */}
</Routes>
```
