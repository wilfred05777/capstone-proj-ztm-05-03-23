// @ts-nocheck
import { createContext, useState, useEffect } from 'react'
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  signOutUser
} from '../utils/firebase/firebase.utils'

// as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
})

// provider
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const value = { currentUser, setCurrentUser }

  // signOutUser()

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        // Centralizing - createUserDocumentFromAuth instead of useContext per component in sign-in.component.jsx, majority of components base is centralized in user.context.jsx
        createUserDocumentFromAuth(user)
      }
      // console.log(user)
      setCurrentUser(user)
    })
    return unsubscribe
  }, [])

  return (
    <>
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
    </>
  )
}

/*
 *  <UserProvider>
 *  <app/>
 *  </UserProvider>
 */
