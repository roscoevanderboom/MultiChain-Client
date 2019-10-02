// Services
import React, { useState, useEffect } from 'react';

// Actions
import listStreams from '../../actions/Streams';

// Components
import { Toolbar, Typography, List } from '@material-ui/core';

// Modal
import CreateStream from '../Modals/streams/CreateStream';
import StreamBrowser from '../Modals/streams/StreamBrowser';

// Styles
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 1),
    marginBottom: 10,
    cursor: 'pointer',
    border: 'solid black 1px'
  },
  text: {
    width: '30%'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

export default function Streams({ props }) {
  const classes = useStyles();
  const [streamList, setStreamList] = useState([]);
  const { multichain } = props.state;

  const list = () => {
    listStreams(multichain, setStreamList);
  }

  useEffect(() => {
    if (multichain) {
      list()
    }
  }, [multichain])



  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" component="h3">
          Streams:
        </Typography>
        <CreateStream props={props} listStreams={list} />
      </Toolbar>

      <List>
        {streamList.map((stream, i) =>
          <StreamBrowser key={i} props={stream} />
        )}
      </List>
    </React.Fragment>
  );
}



