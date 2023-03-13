# capstone-proj-ztm-05-03-23

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
