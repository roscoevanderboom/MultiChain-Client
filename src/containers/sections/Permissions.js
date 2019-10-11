// Services
import React, { useState, useEffect } from 'react';

// Actions
import listPermissions from '../../actions/Permissions';

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

export default ({ props }) => {
  const classes = useStyles();
  const [permissions, setPermissions] = useState(false);

  const { multichain, activeChain } = props.state;

  const list = () => {
    listPermissions(multichain, setPermissions)
  }

  useEffect(() => {
    if (!activeChain) {
      setPermissions(false);
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
          Permissions:
        </Typography>
      </Toolbar>
      <List props={permissions} />
    </React.Fragment>
  );
}
