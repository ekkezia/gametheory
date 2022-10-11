import React, { Component, useContext } from 'react';
import { useState, useEffect, useRef } from "react";
import { collection, addDoc, setDoc, getDocs, doc, onSnapshot } from "firebase/firestore";
import { makeStyles, withTheme } from '@material-ui/core';
import db from './utils/firebase.config';
import { pics } from './Pics';
import { timestamp, serverTimestamp } from './utils/serverTimestamp';
import SubmitContext from './utils/submitContext';

const useStyles = makeStyles((theme) => ({
  container: {
    color: 'white',
  },
  name: {
    borderRadius: '85px',
    padding: '4%'
  },
  submitBtn: {
    margin: '16px',
    padding: '5%',
    borderRadius: '20px',
    background: 'black',
    color: 'white',
    opacity: 0.2,
    transition: 'all 500ms ease'
  },
  enableBtnClass: {
    opacity: 1,
    transition: 'all 500ms ease'
  },
  p: {
    color: 'white'
  }
}));

const imgArray = [];
for (let i = 0; i < 10; i++) {
  imgArray.push('./assets/' + i + '.jpg');
}


function Form() {
  const classes = useStyles();

  const clickMenu = useRef(null);
  const form = useRef(null);

  const { hadSubmitted } = useContext(SubmitContext);

  const [enableBtnClass, setEnableBtnClass] = useState(null);
  const [toggleBtnEnabler, setToggleBtnEnabler] = useState(true);

  const [name, setName] = useState("");
  const [pic, setPic] = useState("");
  const [message, setMessage] = useState("");
  let [currentData, setCurrentData] = useState({ name: "", pic: "" });
  let [regName, setRegName] = useState("");
  let [regIg, setRegIg] = useState("");
  let [regPic, setRegPic] = useState(0);
  let [subs, setSubs] = useState([]);
  let [ordered, setOrdered] = useState([]);
  let allSubs = [];
  let orderedPics = [];
  const picsOptions = ['https://imgur.com/ONukpTh.png', 'https://imgur.com/rY8d0Ye.png', 'https://imgur.com/xXAYEcH.png', 'https://imgur.com/aWS9TAH.png']

  useEffect(() => {
    // CURRENT DATA
    const unsub = onSnapshot(doc(db, "Response", "rGKZUj2fF5JpWiYZmCDJ"), (doc) => {
      console.log("Current data: ", doc.data());
      setCurrentData = doc.data();
      console.log('name', currentData.name);
    });
  });

  function answerPic(e) {

    if (e.target.id == "answer1") {
      setPic("1");
      document.getElementById('answer1button').style.backgroundColor = "black";
      document.getElementById('answer2button').style.backgroundColor = "white";

    }
    else if (e.target.id == "answer2") {
      setPic("2");
      document.getElementById('answer2button').style.backgroundColor = "black";
      document.getElementById('answer1button').style.backgroundColor = "white";

    }
    console.log('answer', e.target.id)
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    hadSubmitted(true);
    const elementsArray = [...e.target.elements];
    console.log('elementsArray', elementsArray);

    try {
      const data = {
        name: name,
        pic: pic,
        time: timestamp,
      }

      const now = serverTimestamp.getTime();

      await setDoc(doc(db, "Responses", `${now}`), data);

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  function showGame() {
    console.log('show game')
    clickMenu.current.style.display = "block";
  }
  function showReply() {
    console.log('show repl')
    form.current.style.display = "block";
  }


  // To enable submit button
  useEffect(() => {
    if (name && pic !== null) {
      setEnableBtnClass(classes.enableBtnClass);
      setToggleBtnEnabler(false);
      console.log('changes', `${enableBtnClass}`)
    }
  }, [name]);

  return (
    <div className={classes.component}>
      <div className="menu" id="game" onClick={showGame}>
        <div className="flex">
          <div className="form"><form onSubmit={handleSubmit}>
            <input className={classes.name}
              type="text"
              value={name} id='name'
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />

            <input className={`${classes.submitBtn} ${enableBtnClass}`} id="submit" name="submit" type="submit" value="Submit" onSubmit={handleSubmit} disabled={toggleBtnEnabler} />

            <div className="message">{message ? <p>{message}</p> : null}</div>
            <div><img src={pics[0]} width='100px' height='100px' /></div>
            <div className={classes.p}>Choice of Answers:</div>
            <div id="answer1button" onClick={() => hadSubmitted(true)}><img id="answer1" src="https://imgur.com/b0ZYobY.png" width='100px' height='100px' /></div>
            <div id="answer2button" onClick={answerPic}><img id="answer2" src="https://imgur.com/ONukpTh.png" width='100px' height='100px' /></div>
            <div><p>Choosing Answer {pic}</p></div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;