// تصطيب خدمة الاو سنتكيشن

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAuth, } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsYs1MK9qqus37UaitYmksZf6zOCQahb0",
  authDomain: "react2-lesson8-54b50.firebaseapp.com",
  projectId: "react2-lesson8-54b50",
  storageBucket: "react2-lesson8-54b50.firebasestorage.app",
  messagingSenderId: "958234909643",
  appId: "1:958234909643:web:e519fd7538dc365042744e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export  const db = getFirestore(app);
