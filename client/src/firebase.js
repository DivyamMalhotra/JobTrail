import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD-79TwAiEaMMWRjfc63zPKAk07VC4P0gE",
  authDomain: "jobtrail-a3070.firebaseapp.com",
  projectId: "jobtrail-a3070",
  storageBucket: "jobtrail-a3070.firebasestorage.app",
  messagingSenderId: "993092372146",
  appId: "1:993092372146:web:e1809272469f86c5432bab"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();