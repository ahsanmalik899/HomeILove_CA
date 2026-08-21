import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUFlrS0nsXNkNAuiWbuPC50GmgHapqPaU",
  authDomain: "homeilove-uk.firebaseapp.com",
  projectId: "homeilove-uk",
  storageBucket: "homeilove-uk.firebasestorage.app",
  messagingSenderId: "165943793003",
  appId: "1:165943793003:web:6580dd31bebc121060282e",
  measurementId: "G-DWNPCP33L2"
};

const app=initializeApp(firebaseConfig);

export const db=getFirestore(app);