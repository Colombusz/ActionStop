import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";
import { getAuth } from "firebase/auth";


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
// const analytics = getAnalytics(app);
// const messaging = getMessaging(app);
export { app, getAuth };
export const messaging = getMessaging(app);

export const generateToken = async () => {
  const permisssion  = await Notification.requestPermission();

  if (permisssion !== 'granted') {
    return null;
  }
  const token = await getToken(messaging, {
    vapidKey:
    "BB7zxEehNkzV-2S_WO1coP0wIb2rcFCQJRBuI4kfA3lk4tzww-ugVtkVuZPihL0yFY2ivadFEVMlO8UjZTCVgU8"
  })
  // console.log(token)

  return token;
}