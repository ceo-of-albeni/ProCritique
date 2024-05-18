// firebase.config.ts
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported as analyticsIsSupported } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDS8M1CuFI9RSVp67RiMR0HPpzZXaLvvH0",
  authDomain: "procritique-ce5f7.firebaseapp.com",
  projectId: "procritique-ce5f7",
  storageBucket: "procritique-ce5f7.appspot.com",
  messagingSenderId: "756895094951",
  appId: "1:756895094951:web:dfd4c4a6342d7222be6382",
  measurementId: "G-HCBRLDL575"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== 'undefined') {
  analyticsIsSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
      console.log('Firebase Analytics initialized');
    } else {
      console.warn('Firebase Analytics is not supported in this environment.');
    }
  });
}
const firebaseDataBase = getDatabase(app);

export { app, analytics, firebaseDataBase };
