import { makeStyles } from '@material-ui/core';
import "react-simple-flex-grid/lib/main.css";
import { useState, useContext, useEffect } from "react";
import SubmitContext from './utils/submitContext';
import db from './utils/firebase.config';
import { collection, addDoc, setDoc, getDocs, doc, onSnapshot } from "firebase/firestore";

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    margin: '0',
    background: 'rgba(255,0.5)',
    backdropFilter: 'blur(15px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    visibility: 'visible',
    transition: 'all 2s ease',
  },
  removeContainer: {
    backdropFilter: 'blur(0px)',
    visibility: 'hidden',
    transition: 'all 2s ease',
  },
  image: {
    border: '5px solid black',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    visibility: 'visible',
    transition: 'all 1s ease',
    [theme.breakpoints.up('md')]: {
      width: '600px',
      height: '600px'
    },
    [theme.breakpoints.down('md')]: {
      width: '400px',
      height: '400px'
    },
    [theme.breakpoints.down('sm')]: {
      width: '300px',
      height: '300px'
    },
  },
  removeImage: {
    border: '5px solid red',
    visibility: 'hidden',
    display: 'none',
    transition: 'all 1s ease'
  }
}));

const picsOptions = ['https://imgur.com/ONukpTh.png', 'https://imgur.com/rY8d0Ye.png', 'https://imgur.com/xXAYEcH.png', 'https://imgur.com/aWS9TAH.png']
// let latestSubmission = picsOptions[allSubsInfo[allSubsInfo.length - 1].pic];

export default function Intro({ allSubmissions }) {
  const classes = useStyles();
  const {submitted} = useContext(SubmitContext);
  const [transitionContainer, setTransitionContainer] = useState(false);
  const [transitionImage, setTransitionImage] = useState(false);
  const [allSubs, setAllSubs] = useState();
  const [latestPic, setLatestPic] = useState('');


  const handleReveal = () => {
    setTransitionContainer(classes.removeContainer);
    setTransitionImage(classes.removeImage);
  }

  let currentImg;
  let latestSubmissionNo;

  useEffect(() => {
    console.log('all subs in content array', allSubs);
    let responseArray = [];
    getDocs(collection(db, "Responses"))
      .then(response => {
        response.forEach((doc) => {
          responseArray.push(doc.data());
          setAllSubs(responseArray);
          // setAllSubs(doc.data());
        });
      });
    }, []);

  useEffect(()=> {
    if(allSubs){
      console.log('all subs in content array', allSubs[allSubs.length - 1]);
      setLatestPic(allSubs[allSubs.length - 1].pic);
    }
  },[allSubs]);

  useEffect(() => {
    if (submitted) {
      handleReveal();
    }
    return;
  }, [submitted]);

  // console.log('res array intro', allSubmissions[0].pic);

  return (
    <div className={`${classes.container} ${transitionContainer}`}>
      <img className={`${classes.image} ${classes.removeImage}}`} id="answer1" src={picsOptions[parseInt(latestPic)]} width='500px' height='500px' />
      {/* {allSubmissions} */}
      {/* <div>{latestSubmission}</div> */}
    </div>
  );
}