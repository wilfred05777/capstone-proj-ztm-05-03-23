// @ts-nocheck
import { createContext, useState, useEffect } from 'react'
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  // createUserProfileDocument,
  signOutUser
} from '../utils/firebase/firebase.utils'

// as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  isLoading: true,
  setCurrentUser: () => null
})

// provider
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const value = { currentUser, setCurrentUser, isLoading }

  // signOutUser()

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener( (user) => {
      if (user) {
        // Centralizing - createUserDocumentFromAuth instead of useContext per component in sign-in.component.jsx, majority of components base is centralized in user.context.jsx
        createUserDocumentFromAuth(user)
      }
      // console.log(user)
      setCurrentUser(user)
      setIsLoading(false)
    })
    return unsubscribe
  }, [])

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChangedListener(async (user) => {
  //     if (user) {
  //       createUserDocumentFromAuth(user)

  //       // const userRef = await createUserDocumentFromAuth(user)

  //       // userRef.onSnapshot((snapshot) => {
  //       //   setCurrentUser({
  //       //     id: snapshot.id,
  //       //     ...snapshot.data()
  //       //   })
  //       // })
  //     }

  //     setCurrentUser(user)
  //     setIsLoading(false)
  //   })

  //   return () => unsubscribe()
  // }, [])

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
