//
import React, { useContext } from 'react';

// State
import { GlobalState } from '../../state';

import routes from '../../routes';

// Components
import List from '@material-ui/core/List';
import ChainButton from './ChainButton';

// Styles
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  }
});

export default () => {
  const classes = useStyles();
  const { state, methods } = useContext(GlobalState);
  const { localChains } = state;
  const sections = []

  return (
    <React.Fragment>
      <List className={classes.list}>
        {routes.map((route, i) => (
          <ChainButton
            key={i}
            section={route.path} />
        ))}
      </List>
    </React.Fragment>
  )
};
