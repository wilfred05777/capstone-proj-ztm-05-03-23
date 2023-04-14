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

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection, // firestore is what governs our database/no sql
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore'

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

/** 129. addCollectionAndDocuments Pt.1 - Pt.2 start */
export const addCollectionAndDocuments = async (
  collectionkey,
  objectsToAdd,
  field = 'title'
) => {
  /** 129. addCollectionAndDocuments Pt.2 start */
  const collectionRef = collection(db, collectionkey)
  const batch = writeBatch(db)

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    // const docRef = doc(collectionRef, object[field].toLowerCase())
    batch.set(docRef, object)
  })

  await batch.commit()
  console.log('done')

  /** 129. addCollectionAndDocuments Pt.2  end */

  /** comments from 128. addCollectionAndDocuments Pt.1
   * - Reference to writeBatch in firestore
    concept of transaction - Scenario for bank account transaction transferring money from 
   
    Wilfred: 1000 => 900
    -100 

    Rowena: 1000 => 1100
    +100
   */
}

/** 129. addCollectionAndDocuments Pt.1 - Pt.2 end */

/**130. Get Products + Categories From Firestore start
 *
 * LEARNING NOTES:
 *  Teachers Note:- One, we got a better understanding of
 *  why we set up all
 *  these utility functions because we want to minimize the impact that
 *  changing third party libraries have on our code base.
 *
 *  this design pattern it's keeping the
 *  order designed pattern for isolating
 *  our code if ever the third party library packages
 *  changes
 *
 *  Teachers Note: - And secondly, we also learned about
 *  using async functions
 *  inside of use effect.
 *  We want to make our own new async function within the callback,
 *  and then what we want to do is we want to call it inside of
 *  the same callback after it's been initialized.
 *
 * javascript design patter and framework changes
 * constantly and rapidly changing
 */
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories')
  // generate a query using this collectionRef
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q)
  // querySnapshot.docs
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data()
    acc[title.toLowerCase()] = items
    return acc
  }, {})

  return categoryMap
}

/**
 * 130. Get Products + Categories From Firestore / Query Structures that
 * we want to achieve
 * Mapping of json objects looks like
 * {
 *   // values
 *   hats: {
 *     title: 'Hats',
 *     items: [
 *     {},
 *     {}
 *    ]
 *   },
 *   sneakers: {
 *     title: 'Sneakers',
 *     items: [
 *      {},
 *      {}
 *     ]
 *    }
 *  }
 *
 *
 */

/**130. Get Products + Categories From Firestore end */

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
// original implementation - error
// export const onAuthStateChangedListener = async (callback) => {
//   await onAuthStateChanged(auth, callback)
// }

// working
export const onAuthStateChangedListener = (callback) => {
  return auth.onAuthStateChanged(callback)
}

// Export onAuthStateChanged method testing implemenation
// export const onAuthStateChangedListener = (callback) => {
//   return auth.onAuthStateChanged(callback)
// }

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
