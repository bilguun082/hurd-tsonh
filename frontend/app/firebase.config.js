// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADKlO6QLq8628_eAdPoiHOabsNQN1Q_rY",
  authDomain: "hurd-tsonh.firebaseapp.com",
  projectId: "hurd-tsonh",
  storageBucket: "hurd-tsonh.appspot.com",
  messagingSenderId: "255827906542",
  appId: "1:255827906542:web:6b1d248b7d00ab896948ff",
  measurementId: "G-F30MCMC7NH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage();
