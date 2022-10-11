import { makeStyles, useTheme, Typography } from '@material-ui/core';
import "react-simple-flex-grid/lib/main.css";
import React, { useEffect, useState } from 'react';
import db from './utils/firebase.config';
import { collection, addDoc, setDoc, getDocs, doc, onSnapshot } from "firebase/firestore";
import Tooltip from '@mui/material/Tooltip';

const useStyles = makeStyles((theme) => ({
  layer: {
    width: '100vw',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  image: {
    width: '100%',
    height: '100%',
  },
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
    aspectRatio: '1/1'
  },
}));

export default function Content({ allSubmissions }) {
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

  return (
    <div className={classes.layer}>
      <div className={classes.container}>
        {allSubs.map((result, key) =>
          <div className={classes.item}>
            <Tooltip title={
              <React.Fragment>
                <Typography color="inherit">Submitted by {result.name}</Typography>
                <em>at {result.time.toString()}</em>
              </React.Fragment>
            } followCursor>
              <img className={classes.image} src={picsOptions[result.pic - 1]} />
            </Tooltip>
          </div>
        )}
      </div>
     </div>
  );
}