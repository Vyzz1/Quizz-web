// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDml0w93EPjOmQHpmQgMj6TU1-nOdoVXpc",
  authDomain: "projectmini5-3d211.firebaseapp.com",
  projectId: "projectmini5-3d211",
  storageBucket: "projectmini5-3d211.appspot.com",
  messagingSenderId: "132933077915",
  appId: "1:132933077915:web:fa63a9542f8be085bdef3e",
  measurementId: "G-05DBV96YBG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
