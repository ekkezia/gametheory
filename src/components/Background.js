import { makeStyles, useTheme } from '@material-ui/core';
import "react-simple-flex-grid/lib/main.css";
import React, { useEffect, useState } from 'react';
import db from './utils/firebase.config';
import { collection, addDoc, setDoc, getDocs, doc, onSnapshot } from "firebase/firestore";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(auto-fill, 10%)',
    },
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(auto-fill, 5%)',
    },
  },
  item: {
    border: '1px solid black',
    aspectRatio: '1/1',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: '10%'
  },
}));

export default function Background({ allSubmissions }) {
  const classes = useStyles();
  const picsOptions = ['https://imgur.com/ONukpTh.png', 'https://imgur.com/rY8d0Ye.png', 'https://imgur.com/xXAYEcH.png', 'https://imgur.com/aWS9TAH.png']
  const [allSubs, setAllSubs] = useState([])

  // Fetch all pre-existing images
  useEffect(() => {
    let responseArray = [];
    getDocs(collection(db, "Responses"))
      .then(response => {
        response.forEach((doc) => {
          responseArray.push(doc.data());
        });
      });

    setAllSubs(responseArray);
  }, []);

  console.log('res array content', allSubs);
  const numberofItems = 300;

  return (
    // <div ={classes.container}>
    <div className={classes.container}>
      {[...Array(numberofItems)].map((e, i) => {
        return (
          <div className={classes.item}>
            {`${i + 1}`}
          </div>
        )
      })}
    </div>
  );
}