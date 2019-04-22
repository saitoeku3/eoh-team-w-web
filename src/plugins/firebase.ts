import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: `${process.env.FIREBASE_PROJRCT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.FIREBASE_PROJRCT_ID}.firebaseio.com`,
  projectId: process.env.FIREBASE_PROJRCT_ID,
  storageBucket: `${process.env.FIREBASE_PROJRCT_ID}.appspot.com`
})

export default firebase
