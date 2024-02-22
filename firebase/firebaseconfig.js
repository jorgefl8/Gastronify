// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = { 
  apiKey: process.env.EXPO_PUBLIC_firebase_apikey,
  authDomain: "restaurantapp-cm.firebaseapp.com",
  projectId: "restaurantapp-cm",
  storageBucket: "restaurantapp-cm.appspot.com",
  messagingSenderId: "933625397144",
  appId: "1:933625397144:web:e6bb31b993f535561275ed",
  measurementId: "G-JDKL88GKEF"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirestoreDB = getFirestore(FirebaseApp);
export const FirestoreST = getStorage(FirebaseApp);