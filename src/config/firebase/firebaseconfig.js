import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyDuuwR4UnqFcgvFI6t1fzcxcF9DznRQMrM",
  authDomain: "blogging-app-c27a2.firebaseapp.com",
  projectId: "blogging-app-c27a2",
  storageBucket: "blogging-app-c27a2.appspot.com",
  messagingSenderId: "373693724328",
  appId: "1:373693724328:web:c4bdf106e9dc849b79349d",
  measurementId: "G-JYVKQDRT48"
};


const app = initializeApp(firebaseConfig);

export default app