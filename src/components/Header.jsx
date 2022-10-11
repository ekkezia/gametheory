import { makeStyles, useTheme } from '@material-ui/core';
import { useState, useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    transform: 'translateX(-50%)',
    top: '-90vh',
    left: '50%',
    height: '100vh',
    background: 'rgba(0,0,0, 0.5)',
    borderRadius: '85px',
    backdropFilter: 'blur(10px)',
    textAlign: 'center',
    transition: 'all 1.5s ease',
    [theme.breakpoints.up('md')]: {
      width: '33vw',
    },
    [theme.breakpoints.down('md')]: {
      width: '70vw',
    },
  },
  hoverChange: {
    top: '-50vh',
    transition: 'all 1.5s ease',
    animation: "$hover 1.5s ease infinity"
  },
  content: {
    position: 'absolute',
    left: '50%',
    bottom: 0,
    textAlign: 'center',
    transform: 'translate(-50%, 0%)',
    color: 'white',
    fontSize: '28px',
    padding: '2%',
    [theme.breakpoints.up('md')]: {
      paddingBottom: '5%'
    },
    [theme.breakpoints.down('md')]: {
      paddingBottom: '6%'
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '6%'
    },
  },
  p: {
    marginBottom: '16px',
    fontSize: '14px',
  },
  "@keyframes hover": {
    "0%, 100%": {
      transform: 'translateY(0px)'
    },
    "50%": {
      transform: 'translateY(100px)'
    }
  }
}));

export default function Header() {
  const classes = useStyles();

  const [hoverClass, setHoverClass] = useState(null);

  useEffect(() => {
    setHoverClass(hoverClass ? classes.hoverChange : '');
    console.log('change');
  }, [hoverClass]);

  return (
    <div className={`${classes.container} ${hoverClass}`}
      onMouseEnter={
        (() => { setHoverClass(true) })
      }
      onMouseLeave={
        (() => { setHoverClass(false) })
      } >
      <div className={classes.content} >
        <div className={classes.p} >
          concept by ekezia + marco1ee.
        </div>
        <div className={classes.p} >
          player01 is ugh.isha, player02 is parano0dle.
        </div>

        <div className={classes.p} >
          this is a game where you are invited to play to cooperate or to betray.
        </div>
        <div className={classes.title} >
          game theory
        </div>
      </div >
    </div>
  );
}