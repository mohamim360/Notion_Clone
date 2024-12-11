import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApvI5yakKVoBnFE5U0RGH0BZzEQGudEWY",
  authDomain: "linkedin-clone-38895.firebaseapp.com",
  projectId: "linkedin-clone-38895",
  storageBucket: "linkedin-clone-38895.firebasestorage.app",
  messagingSenderId: "845240082725",
  appId: "1:845240082725:web:099bf9429b73017ae5facc",
  measurementId: "G-HWCV90K18N",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
export { db };
