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
  apiKey: "AIzaSyAdlSbfv09lMPszXILV7rtTYF4TDoP_hu4",
  authDomain: "rankers-743b9.firebaseapp.com",
  databaseURL: "https://rankers-743b9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rankers-743b9",
  storageBucket: "rankers-743b9.appspot.com",
  messagingSenderId: "676141012819",
  appId: "1:676141012819:web:a6606633146e61c697f3a6",
  measurementId: "G-LK6CLE7GS1"
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