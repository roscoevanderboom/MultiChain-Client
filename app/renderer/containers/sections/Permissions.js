// Services
import React, { useEffect, useContext } from 'react';

// State
import { GlobalState } from '../../state/state';

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
  const { state } = useContext(GlobalState);
  const { permissions } = state;

  return (permissions &&
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
