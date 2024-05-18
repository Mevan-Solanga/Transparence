import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBW8dI7JxlJTYsr6hN_XvbecUtHR4-YS7k",
  authDomain: "hawkhacks-e9dc8.firebaseapp.com",
  projectId: "hawkhacks-e9dc8",
  storageBucket: "hawkhacks-e9dc8.appspot.com",
  messagingSenderId: "34218783576",
  appId: "1:34218783576:web:c0e92259004795496a2b2d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
