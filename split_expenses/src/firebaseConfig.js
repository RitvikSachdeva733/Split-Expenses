// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNAp2kCoiiX6I5fa1n7OOoWP2X4G8v4b8",
  authDomain: "feeproject-ff319.firebaseapp.com",
  projectId: "feeproject-ff319",
  storageBucket: "feeproject-ff319.appspot.com",
  messagingSenderId: "915585377256",
  appId: "1:915585377256:web:05197c60128765673f7a5d",
  measurementId: "G-HGVKQGTB1T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export{db};