import { makeStyles, useTheme } from '@material-ui/core';
import { useState, useEffect } from 'react';
import Form from './form';
import Tooltip from '@mui/material/Tooltip';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'fixed',
    transform: 'translateX(-50%)',
    top: '90vh',
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
    top: '20vh',
    transition: 'all 1.5s ease',
    animation: "$hover 1.5s ease infinity"
  },
  content: {
    position: 'absolute',
    left: '50%',
    top: 0,
    textAlign: 'center',
    transform: 'translate(-50%, 0%)',
    padding: '4%',
    [theme.breakpoints.up('md')]: {
      paddingTop: '5%'
  },
  [theme.breakpoints.down('md')]: {
    paddingTop: '6%'
  },
  },
  header: {
    color: 'white',
    fontSize: '28px',
  },
  form: {
    padding: '4%',
    paddingTop: '10%',
  }
}));

export default function Footer() {
  const classes = useStyles();

  const [hoverClass, setHoverClass] = useState(null);

  useEffect(() => {
    setHoverClass(hoverClass ? classes.hoverChange : '');
    console.log('change');
  }, [hoverClass]);

  return (
    <div className={classes.parent}>
      <div className={`${classes.container} ${hoverClass}`} onMouseEnter={(() => { setHoverClass(true) })} onMouseLeave={(() => { setHoverClass(false) })}>
        <div className={classes.content}>
          <Tooltip title="You don't have permission to do AAAA" followCursor>
            <div className={classes.header}>
              choose
            </div>
          </Tooltip>
          <div className={classes.form}>
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
}