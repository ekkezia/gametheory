import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export const timestamp = firebase.firestore.Timestamp.fromDate(new Date()).toDate().toDateString() + ' at ' + new Date().toLocaleTimeString();
export const serverTimestamp = new Date();

