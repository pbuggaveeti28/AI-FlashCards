// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYvnWYa3BFAMlpoL3C5LbthBrqC0Ot8_A",
  authDomain: "flashcardsaas-bc82f.firebaseapp.com",
  projectId: "flashcardsaas-bc82f",
  storageBucket: "flashcardsaas-bc82f.appspot.com",
  messagingSenderId: "24198818779",
  appId: "1:24198818779:web:05e836fd93bec6793955fe",
  measurementId: "G-T6DYP619SW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
