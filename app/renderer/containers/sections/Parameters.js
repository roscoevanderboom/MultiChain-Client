// Services
import React, { useState, useEffect, useContext } from 'react';

// State
import { GlobalState } from '../../state/state';
// Actions
import { blockchainParams } from '../../actions/Parameters';

// Components
import { Typography, Toolbar } from '@material-ui/core';
import List from './components/parameters/List';
// Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
}));

export default () => {
  const classes = useStyles();
  const { state, methods } = useContext(GlobalState);
  const { multichain, params } = state;
  const { setParams } = methods;

  useEffect(() => {
    if (!multichain) {
      setParams([]);
      return;
    };
    blockchainParams(multichain)
      .then(res => setParams(res))
      .catch(err => console.log(err))
  }, [multichain])

  return (multichain &&
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" component="h3">
          Parameters:
        </Typography>
      </Toolbar>
      <List params={params} />
    </React.Fragment>
  );
}
