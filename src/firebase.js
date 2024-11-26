// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZXO-v2nDKFenL52A7QsCTwqdmbUDjPx4",
  authDomain: "seven-bit-news-d709f.firebaseapp.com",
  projectId: "seven-bit-news-d709f",
  storageBucket: "seven-bit-news-d709f.firebasestorage.app",
  messagingSenderId: "79776897855",
  appId: "1:79776897855:web:193c33886fbdf4ab4a918a",
  measurementId: "G-2TJ5J19FBK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider, signInWithPopup, signOut, analytics };
