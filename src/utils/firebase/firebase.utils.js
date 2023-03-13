// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
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

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

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

  // psuedo code
  // if user data does not exist
  // create / set the document with the data from userAuth in my collection
  // if user data exists
  // return userSnapshot
}
