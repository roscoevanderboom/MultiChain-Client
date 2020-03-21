// Services
import React, { useContext } from 'react';

// State
import { GlobalState } from '../../../state';

// Components
import { Toolbar } from '@material-ui/core';
import List from './List';

// Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

export default () => {
  const classes = useStyles();
  const { state } = useContext(GlobalState);
  const { peers } = state;

  return (peers &&
    <Toolbar className={classes.toolbar}>
      {peers.length === 0 ? 'No peers' : <List peers={peers} />}
    </Toolbar>
  );
}
