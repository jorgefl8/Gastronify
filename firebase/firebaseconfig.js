import { initializeApp } from "firebase/app";
import { Platform } from 'react-native';
import { initializeAuth, getAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
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
let auth;

// Utilizar React Native AsyncStorage para persistencia en React Native
if (Platform.OS === 'web') {
  // En web, utiliza la persistencia por defecto
  auth = getAuth(app);
} else {
  // En React Native, utiliza React Native AsyncStorage para persistencia
  const { getReactNativePersistence } = require('firebase/auth');
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
}
export const FirebaseApp = app;
export const FirebaseAuth = auth;
export const FirestoreDB = getFirestore(app);
export const FirestoreST = getStorage(app);

