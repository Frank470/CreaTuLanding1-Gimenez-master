import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTuJdi-y8fZQiyF_uJM4uhMOFGngLlnx4",
  authDomain: "proyectoreact-fbfd8.firebaseapp.com",
  projectId: "proyectoreact-fbfd8",
  storageBucket: "proyectoreact-fbfd8.appspot.com",
  messagingSenderId: "1093613981889",
  appId: "1:1093613981889:web:c97213f480e8f3e4b20440"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
