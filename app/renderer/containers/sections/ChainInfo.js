// Services
import React, { useState, useEffect } from 'react';

// Actions
import ChainInfo from '../../actions/ChainInfo';

// Components
import { Typography, Toolbar, List, ListItemText } from '@material-ui/core';

// Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 1),
  },
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

export default ({ props }) => {
  const classes = useStyles();
  const [keys, setKeys] = useState([]);
  const [values, setValues] = useState([]);
  const { multichain, activeChain } = props.state;
  const { clearState } = props.functions;

  const getInfo = () => {
    ChainInfo(multichain, setKeys, setValues);
  }

  useEffect(() => {
    if (!activeChain) {
      setKeys([]);
      setValues([]);
    }
  }, [activeChain])

  useEffect(() => {
    if (multichain) {
      getInfo();
    }
  }, [multichain])

  return (
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
