import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';
import Background from './components/Background';
import Intro from './components/Intro';
import React, { Component, useState, useEffect, useRef, useContext } from 'react';
import db from './components/utils/firebase.config';
import { collection, addDoc, setDoc, getDocs, doc, onSnapshot } from "firebase/firestore";
import { allSubsInfo, getSubmission } from './components/utils/allSubmission';
import SubmitContext from './components/utils/submitContext';

function App() {
  const [allSubs, setAllSubs] = useState(allSubsInfo);
  const [currentImg, setCurrentImg] = useState(allSubsInfo);
  const [submitted, hadSubmitted] = useState(false);

  let responseArray = [];
  let n = 'a';

  useEffect(() => {
    let responseArray = [];
    getDocs(collection(db, "Responses"))
      .then(response => {
        response.forEach((doc) => {
          responseArray.push(doc.data());
          setAllSubs(responseArray);
        });
      });


      setCurrentImg(allSubs);
      console.log('all sub', currentImg);

  }, []);


  // let img = allSubs[0].pic;
  // console.log('check', allSubs[0].name);

  return (
    <SubmitContext.Provider value={{ submitted, hadSubmitted }}>
    <div className="App">
        <Background />
        <Content />
        <Intro allSubmissions={allSubs} />
        <Header />
        <Footer />
      </div>
    </SubmitContext.Provider>
  );
}

export default App;
