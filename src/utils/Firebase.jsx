// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiCb317x_bMtmE278RGXTlU8LS0GVTb6w",
  authDomain: "ck-gpt.firebaseapp.com",
  projectId: "ck-gpt",
  storageBucket: "ck-gpt.firebasestorage.app",
  messagingSenderId: "895858107431",
  appId: "1:895858107431:web:ec9931b68073d7dbb3da02",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Enable Google Auth Provider
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
export { auth, provider };
