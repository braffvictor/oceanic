// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5O-XDlxJ8MZ5oJj3xTScpEi7sLTcVNn8",
  authDomain: "oceanic-e9fa9.firebaseapp.com",
  projectId: "oceanic-e9fa9",
  storageBucket: "oceanic-e9fa9.appspot.com",
  messagingSenderId: "776724798346",
  appId: "1:776724798346:web:a85e78f334cee53d668673",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const str = getStorage(app);
