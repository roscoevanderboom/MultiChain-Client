// Services
import React, { useState, useEffect } from 'react';

// Constants

// Components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

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
    width: '30%'
  }
}));


export default function Peers({ props }) {

  const classes = useStyles();
  const [keys, setKeys] = useState([]);
  const [values, setValues] = useState([]);
  const { multichain } = props.state;

  useEffect(() => {
    if (multichain) {
      multichain.getPeerInfo((err, res) => {
        if (err) {
          console.log(err);
          return;
        }

        setKeys(Object.keys(res));
        setValues(Object.values(res));
      });
    }
  }, [multichain])

  return (
    <React.Fragment>
    <Typography variant="h5" component="h3">
     Peers:
      <List className={classes.list}>
        {keys.map((key, i)=>
          <ListItemText
          className={classes.text}
          key={key}
          primary={`${key}`}
          secondary={`${values[i]}`}/>
          )}
      </List>
    </Typography>
  </React.Fragment>
  );
}
