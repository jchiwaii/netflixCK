// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAC0tiCGeYL4ZIz-Vy1ax6Swu1xhUIHgKY",
  authDomain: "netflix-ck.firebaseapp.com",
  projectId: "netflix-ck",
  storageBucket: "netflix-ck.firebasestorage.app",
  messagingSenderId: "851512294363",
  appId: "1:851512294363:web:ee98b1d6d9c490138245fe",
  measurementId: "G-RJBM51VQSR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
