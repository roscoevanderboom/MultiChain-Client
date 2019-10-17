// Services
import React, { useState, useEffect, useContext } from 'react';

// State
import { GlobalState } from '../../state/state';

// Actions
import { getPeerInfo } from '../../actions/Peers';

// Components
import { Typography, Toolbar } from '@material-ui/core';
import List from './components/peers/List';

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
  const { state, methods } = useContext(GlobalState);
  const { multichain, peers } = state;
  const { setPeers } = methods;

  useEffect(() => {
    if (!multichain) {
      setPeers([]);
      return;
    }
    getPeerInfo(multichain)
      .then(res => setPeers(res))
      .catch(err => console.log(err))
  }, [multichain])

  return (multichain &&
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" component="h3">
          Peers:
        </Typography>
      </Toolbar>
      {peers.length === 0 ? 'No peers' : <List peers={peers} />}
    </React.Fragment>
  );
}
