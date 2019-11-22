import React from 'react';

// Containers
import LeftDrawer from './LeftDrawer';
import RightDrawer from './RightDrawer';

// Components
import { AppBar, Toolbar, Typography } from '@material-ui/core';

// Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    margin: '0',
    position: 'fixed',
    width: '100%',
    top: 35,
    zIndex: '900',
  }
}));

export default ({ activeChain }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar id="toolbar">
          <LeftDrawer />
          <Typography variant="h6" className={classes.title}>
            {activeChain ? activeChain : 'No chain loaded'}
          </Typography>
          <RightDrawer />
        </Toolbar>
      </AppBar>
    </div>
  );
}
