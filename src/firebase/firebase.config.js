// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyBHeBDnnOIU2MkSfrcgNuetYkP7oNMrwag",
  apiKey: "AIzaSyBHeBDnnOIU2MkSfrcgNuetYkP7oNMrwag",
  authDomain: "simple-firebase-65f27.firebaseapp.com",
  projectId: "simple-firebase-65f27",
  storageBucket: "simple-firebase-65f27.firebasestorage.app",
  messagingSenderId: "113928527430",
  appId: "1:113928527430:web:76d81c51963283a0ddf447",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
