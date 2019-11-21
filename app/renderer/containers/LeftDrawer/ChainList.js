//
import React, { useContext } from 'react';

// State
import { GlobalState } from '../../state/state';

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

  return (
    <React.Fragment>
      <List className={classes.list}>
        {localChains.map((chain, i) => (
          <ChainButton
            key={i}
            chain={chain}
            state={state}
            methods={methods} />
        ))}
      </List>
    </React.Fragment>
  )
};
