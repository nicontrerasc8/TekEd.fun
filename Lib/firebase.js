import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCjirX4pe35zXRRH79a_8BpyzzXwbISmso",
  authDomain: "matio-f53ce.firebaseapp.com",
  projectId: "matio-f53ce",
  storageBucket: "matio-f53ce.appspot.com",
  messagingSenderId: "1087635100142",
  appId: "1:1087635100142:web:7478992a261280582afeff",
  measurementId: "G-LHYJKS02ED"
};
  
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export async function getUserWithUserID(uid) {
  console.log(uid)
  const usersRef = firestore.collection('users').where("capital", "==", true);
  const userDoc = (await usersRef.get());
  console.log(userDoc)
  return userDoc;
}

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const arrayUnion = firebase.firestore.FieldValue.arrayUnion()
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export const fromMillis = firebase.firestore.Timestamp.fromMillis;

export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
  };
}