// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcXDG5bXAfT6KwfEWTts_PCrIoOcCVOEk",
  authDomain: "genshin-todo-list.firebaseapp.com",
  projectId: "genshin-todo-list",
  storageBucket: "genshin-todo-list.appspot.com",
  messagingSenderId: "628111436359",
  appId: "1:628111436359:web:696996945d714bb9ad5f62",
  measurementId: "G-WM3E7J80EB",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
