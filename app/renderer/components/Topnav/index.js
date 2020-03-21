import React, { useContext } from 'react';
// State
import { GlobalState } from '../../state';
// Containers
import LeftDrawer from '../../containers/LeftDrawer';
import RightDrawer from '../../containers/RightDrawer';

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

export default () => {
  const classes = useStyles();
  const { state, methods } = useContext(GlobalState);

  React.useEffect(() => {
    console.log(state.chainInfo)
  }, [state.chainInfo])

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar id="toolbar">
          <LeftDrawer />
          <Typography variant="h6" className={classes.title}>
            {state.chainInfo ? state.chainInfo.chainname : 'No chain loaded'}
          </Typography>
          <RightDrawer />
        </Toolbar>
      </AppBar>
    </div>
  );
}
