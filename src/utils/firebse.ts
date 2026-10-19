import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD01GLJkXrkOXlrI8akQUAeNdYRONcpAvI",
  authDomain: "homeilove-ca.firebaseapp.com",
  projectId: "homeilove-ca",
  storageBucket: "homeilove-ca.firebasestorage.app",
  messagingSenderId: "787481007765",
  appId: "1:787481007765:web:4a1a1160014a8c5b1c6d9c"
};

const app=initializeApp(firebaseConfig);

export const db=getFirestore(app);