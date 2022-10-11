// import firebase from 'firebase';
import { initializeApp } from "firebase/app";

import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA6LdJh0KDusKId6RiuzCY0wBtPcke1nyo",
    authDomain: "gametheory-1f44e.firebaseapp.com",
    projectId: "gametheory-1f44e",
    storageBucket: "gametheory-1f44e.appspot.com",
    messagingSenderId: "660278970969",
    appId: "1:660278970969:web:b49cd16f2140e53018ff48",
    measurementId: "G-Y68GG5ZMVV"
  };

/* Instantiate firebase */
const firebaseDB = initializeApp(firebaseConfig);

/* Export firebase */
export default firebaseDB;
