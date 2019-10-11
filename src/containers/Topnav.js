import React from 'react';
import { ipcRenderer } from 'electron';

// Containers
import LeftDrawer from './LeftDrawer';
import RightDrawer from './RightDrawer';

// Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


// Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    margin: '0',
    position: 'fixed',
    width: '100%',
    top: 35,
    zIndex: '900'
  },
  toolbar: {
    justifyContent: 'space-between',
    padding: '0',
  },
  barIcon: {
    color: 'white'
  }
}));

export default function Topnav({ props }) {

  const { activeChain } = props.state

  const classes = useStyles();

  props.classes = classes;


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <LeftDrawer props={props} />
          <Typography variant="h6" className={classes.title}>
            {activeChain ? activeChain : 'No chain loaded'}
          </Typography>
          <RightDrawer props={props} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
