// Services
import React, { useState, useEffect } from 'react';

// Actions
import listPeers from '../../actions/Peers';

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



export default ({ props }) => {
  const classes = useStyles();
  const [peers, setPeers] = useState(false);

  const { multichain, activeChain } = props.state;

  const list = () => {
    listPeers(multichain, setPeers)
  }

  useEffect(() => {
    if (!activeChain) {
      setPeers(false);
    }
  }, [activeChain])

  useEffect(() => {
    if (multichain) {
      list()
    }
  }, [multichain])

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" component="h3">
          Peers:
        </Typography>
      </Toolbar>

      {!peers ? 'No connected peers' : <List props={peers} />}
    </React.Fragment>
  );
}
