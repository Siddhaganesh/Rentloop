// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBDAZvvz-YCWlKV9PtopSUOt0UmSKDe1fA",
  authDomain: "rentloop-81269.firebaseapp.com",
  projectId: "rentloop-81269",
  storageBucket: "rentloop-81269.firebasestorage.app",
  messagingSenderId: "935644254211",
  appId: "1:935644254211:web:20ab9b1e6e14136d7bbe36",
  measurementId: "G-3B7X3VGXTS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
