const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import Firebase from './node_modules/@firebase/app';
import 'firebase/auth';
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

  const firebase = Firebase.initializeApp(firebaseConfig);

  const fstore = firebase.firestore();

  export { firebase };