// @ts-nocheck
import { createContext, useState, useEffect, useReducer } from 'react'
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

// {
//   currentUser = null || googleAuthObj,
//   firstName: '',
//   lastName: ''
// }

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
}

export const userReducer = (state, action) => {
  console.log('dispatched')
  console.log(action)
  const { type, payload } = action

  switch (type) {
    // case 'SET_CURRENT_USER':
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }

    // case 'increment':
    //   return { value: state.value + 1 }
    default:
      throw new Error(`Unhandled type ${type} in userReducer`)
  }

  // return {
  //   currentUser: payload
  // }
}

const INITIAL_STATE = {
  currentUser: null
}

// provider
export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null)

  // const [state, dispatch] = userReducer(userReducer, INITIAL_STATE)
  const [{ currentUser }, dispatch] = userReducer(userReducer, INITIAL_STATE)
  console.log(currentUser)

  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user })
  }
  // dispatch()

  const value = { currentUser, setCurrentUser, isLoading }

  // const [isLoading, setIsLoading] = useState(true)

  // signOutUser()

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        // Centralizing - createUserDocumentFromAuth instead of useContext per component in sign-in.component.jsx, majority of components base is centralized in user.context.jsx
        createUserDocumentFromAuth(user)
      }
      // console.log(user)
      setCurrentUser(user)
      setIsLoading(false)
    })

    // return unsubscribe
    return () => unsubscribe()
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

/* 146 - userReducer
 const userReducer = (state, action)  => {
  return {
    currentUser: null
  }
 }
 */

/*
 *  <UserProvider>
 *  <app/>
 *  </UserProvider>
 */
