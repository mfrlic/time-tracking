import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDEGs1z9QrETfaU5uBEr8DFFqsuiycx22I",
  authDomain: "time-tracking-ae2cb.firebaseapp.com",
  projectId: "time-tracking-ae2cb",
  storageBucket: "time-tracking-ae2cb.appspot.com",
  messagingSenderId: "386492941769",
  appId: "1:386492941769:web:dc7fa9bc591199efced418",
  measurementId: "G-HNSK0YYEBK",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
