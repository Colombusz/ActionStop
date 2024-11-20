

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0Xg2aDQrSPfQuJ8V6oN4N26ZVHZVXyzU",
  authDomain: "actionstop-3a728.firebaseapp.com",
  projectId: "actionstop-3a728",
  storageBucket: "actionstop-3a728.firebasestorage.app",
  messagingSenderId: "989052833474",
  appId: "1:989052833474:web:e2dda707c7e8701956f55b",
  measurementId: "G-1WNLECP7D5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };