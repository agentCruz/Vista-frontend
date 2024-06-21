import { getApp, getApps, initializeApp } from "firebase/app";
import {
  initializeFirestore,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const apps = getApps();
const app = !apps.length ? initializeApp(firebaseConfig) : getApp();
const firebaseAuth = getAuth(app);
const firebaseStorage = getStorage(app);

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});;

export { firebaseAuth, firebaseStorage, db };