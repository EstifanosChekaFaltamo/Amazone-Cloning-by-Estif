// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth"
import "firebase/compat/firestore";
import "firebase/compat/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyACBBgP7K1TsERo6IjyxlLkGQA6C-pRyL0",
    authDomain: "clone-vite.firebaseapp.com",
    projectId: "clone-vite",
    storageBucket: "clone-vite.appspot.com",
    messagingSenderId: "173781850525",
    appId: "1:173781850525:web:86f1d06211c6f3dbd0f774"
};

// Initialize Firebase

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(app);
const db = app.firestore();

export { auth, db };
