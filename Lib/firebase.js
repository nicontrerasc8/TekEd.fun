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

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();