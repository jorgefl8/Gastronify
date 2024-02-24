// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = { 
  apiKey: process.env.EXPO_PUBLIC_firebase_apikey,
  authDomain: "restaurantapp-cm.firebaseapp.com",
  projectId: "restaurantapp-cm",
  storageBucket: "restaurantapp-cm.appspot.com",
  messagingSenderId: "933625397144",
  appId: "1:933625397144:web:e6bb31b993f535561275ed",
  measurementId: "G-JDKL88GKEF"
};
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirestoreDB = getFirestore(FirebaseApp);
export const FirestoreST = getStorage(FirebaseApp);