import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyBZgXdgIr1hLdjrUqaTERpoFY_-AVriXmQ",
  authDomain: "little-lemon-restaurant-3fe5e.firebaseapp.com",
  projectId: "little-lemon-restaurant-3fe5e",
  storageBucket: "little-lemon-restaurant-3fe5e.appspot.com",
  messagingSenderId: "47957393728",
  appId: "1:47957393728:web:d3e9a16a252eeadac17aa5",
  measurementId: "G-3L04TZ5SSD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app); 

