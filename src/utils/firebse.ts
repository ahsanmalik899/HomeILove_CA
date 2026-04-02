import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChdVbErz6QF9DegHETf-ZOkcDqC1tp9fU",
  authDomain: "homeilove-us.firebaseapp.com",
  projectId: "homeilove-us",
  storageBucket: "homeilove-us.firebasestorage.app",
  messagingSenderId: "750528181489",
  appId: "1:750528181489:web:1f3648b8fb07ebc65b2550"
};

const app=initializeApp(firebaseConfig);

export const db=getFirestore(app);