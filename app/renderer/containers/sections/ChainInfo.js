// Services
import React, { useState, useEffect, useContext } from 'react';

// State
import { GlobalState } from '../../state/state';

// Actions
import { getInfo } from '../../actions/ChainInfo';

// Components
import { Typography, Toolbar, List, ListItemText } from '@material-ui/core';

// Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  list: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  text: {
    width: '30%',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
}));

export default () => {
  const classes = useStyles();
  const [keys, setKeys] = useState([]);
  const [values, setValues] = useState([]);
  const { state } = useContext(GlobalState);
  const { multichain, chainInfo } = state;

  useEffect(() => {
    if (!multichain) {
      setKeys([]);
      setValues([]);
      return;
    };
    setKeys(Object.keys(chainInfo));
    setValues(Object.values(chainInfo));
  }, [chainInfo, multichain])

  return (multichain &&
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" component="h3">
          Chain Details:
        </Typography>
      </Toolbar>

      <List className={classes.list}>
        {keys.map((key, i) =>
          <ListItemText
            className={classes.text}
            key={key}
            primary={`${key}`}
            secondary={`${values[i]}`} />
        )}
      </List>
    </React.Fragment>
  );
}
