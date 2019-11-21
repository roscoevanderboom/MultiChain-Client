// Services
import React, { useState, useEffect, useContext } from 'react';

// State
import { GlobalState } from '../../state/state';

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
  const { state } = useContext(GlobalState);
  const { params } = state;

  return (params &&
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
