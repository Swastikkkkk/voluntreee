import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWmhbai2iJJDwl5aljTAJvK-jVBqAFOHA",
  authDomain: "volunteer-63b3d.firebaseapp.com",
  projectId: "volunteer-63b3d",
  storageBucket: "volunteer-63b3d.firebasestorage.app",
  messagingSenderId: "635195431248",
  appId: "1:635195431248:web:66bb43df46840b538c3455",
  measurementId: "G-R2FD26ZY2S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
