// Services
import React, { useState, useEffect } from 'react';

// Constants

// Components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import StreamBrowser from './components/streams/StreamBrowser';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

// Modal
import CreateStream from '../Modals/streams/CreateStream';

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

export default function Streams({ props }) {
  const classes = useStyles();
  const [keys, setKeys] = useState([]);
  const [values, setValues] = useState([]);
  const { multichain } = props.state;

  useEffect(() => {
    if (multichain) {
      multichain.listStreams((err, res) => {
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
     Streams:
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



