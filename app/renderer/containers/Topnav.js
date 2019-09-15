import React from 'react';

// Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LeftDrawer from '../components/LeftDrawer'
import RightDrawer from '../components/RightDrawer'

import CreateChain from '../Modals/CreateChain'

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

  }
}));

export default function Topnav({ props }) {

  const { state } = props;
  const { currentChain } = state;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <LeftDrawer props={props} />
          <Typography variant="h6" className={classes.title}>
            {currentChain ? currentChain.name : 'No chain loaded'}
          </Typography>
          <RightDrawer props={props} />
        </Toolbar>
      </AppBar>
    </div>
  );
}


