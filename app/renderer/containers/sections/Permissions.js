// Services
import React, { useState, useEffect, useContext } from 'react';

// State
import { GlobalState } from '../../state/state';

// Actions
import { listPermissions } from '../../actions/Permissions';

// Components
import { Typography, Toolbar } from '@material-ui/core';
import List from './components/permissions/List';

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
  const { multichain, permissions } = state;
  const { setPermissions } = methods;


  useEffect(() => {
    if (!multichain) {
      setPermissions([]);
      return;
    }
    listPermissions(multichain)
      .then(res => setPermissions(res))
      .catch(err => console.log(err))
  }, [multichain])


  return (multichain &&
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" component="h3">
          Permissions:
        </Typography>
      </Toolbar>
      <List permissions={permissions} />
    </React.Fragment>
  );
}
