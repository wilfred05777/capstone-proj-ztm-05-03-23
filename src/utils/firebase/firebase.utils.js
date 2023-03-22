// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
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

/**
 *  Functionality - Create User in Firestore with authentication
 * =================================================================================================
 */
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

/**
 *  Functionality - Create User in Firestore with authentication - End of function
 * =================================================================================================================
 */

/**
 *  Functionality for CreateAuth User with Email and Password in firestore
 *  =================================================================================================================
 */
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  // the general idea - in between protected if there is a change between firebase methods
  if (!email || !password) return

  return await createUserWithEmailAndPassword(auth, email, password)
}

/**
 *  Functionality for CreateAuth User with Email and Password in firestore - END of function
 *  ==============================================================================
 */

/**
 *  Functionality for SignIn User with Email and Password in firestore - END of function
 *  ==============================================================================
 */
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await signInWithEmailAndPassword(auth, email, password)
}

/**
 *  Functionality for Sign-Out interface layer function in firestore start
 *  =================================================================================================================
 */

export const signOutUser = async () => await signOut(auth)

/**
 *  Functionality for Sign-Out interface layer function in firestore end
 *  =================================================================================================================
 */

export const onAuthStateChangedListener = async (callback) =>
  await onAuthStateChanged(auth, callback)

/**
 * asynchronous stream callback
 *
 * export const onAuthStateChangedListener = async (callback) =>
 *
 *   await onAuthStateChanged(auth, callback, errorCallback, completedCallback)
 * {
 *  next: callback,
 *  error: error callback,
 *  complete: completedCallback
 * }
 */
