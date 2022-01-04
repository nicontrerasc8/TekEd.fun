import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBDmrhelTOfm8sIiJ5W8u4BLYEqcODpo-0",
    authDomain: "tareas-4930a.firebaseapp.com",
    projectId: "tareas-4930a",
    storageBucket: "tareas-4930a.appspot.com",
    messagingSenderId: "879383118014",
    appId: "1:879383118014:web:2797d4f60115cc767fdeef",
    measurementId: "G-2TDFKLGNZV"
};
  
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();