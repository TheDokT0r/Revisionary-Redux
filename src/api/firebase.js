// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8bmgAIuCfJrlDUvjGityj_1D65ky9qus",
  authDomain: "revitionary.firebaseapp.com",
  projectId: "revitionary",
  storageBucket: "revitionary.appspot.com",
  messagingSenderId: "637183935690",
  appId: "1:637183935690:web:0c73dae0c60bef51676033"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;