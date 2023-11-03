// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEGs1z9QrETfaU5uBEr8DFFqsuiycx22I",
  authDomain: "time-tracking-ae2cb.firebaseapp.com",
  projectId: "time-tracking-ae2cb",
  storageBucket: "time-tracking-ae2cb.appspot.com",
  messagingSenderId: "386492941769",
  appId: "1:386492941769:web:dc7fa9bc591199efced418",
  measurementId: "G-HNSK0YYEBK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export default app;
