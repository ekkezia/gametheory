import React, { Component } from 'react';
import { useState, useEffect, useRef } from "react";
import db from './firebase.config';
import { collection, addDoc, setDoc, getDocs, doc, onSnapshot } from "firebase/firestore";


let allSubs = [];

export const getSubmission = getDocs(collection(db, "Responses"))
.then(response => {
      response.forEach((doc) => {
      allSubs.push(doc.data());
});
});

export const allSubsInfo = allSubs;