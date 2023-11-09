import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyAg8HhHAvirlJgUfP1TQgxJArvBinImQ1U",
  authDomain: "react-fb-auth-5b5b3.firebaseapp.com",
  projectId: "react-fb-auth-5b5b3",
  storageBucket: "react-fb-auth-5b5b3.appspot.com",
  messagingSenderId: "311307923404",
  appId: "1:311307923404:web:ea9c081dd152d2dc21b769",
  measurementId: "G-SZ6EX6KW6D",
};

// Initialize Firebase
export const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
