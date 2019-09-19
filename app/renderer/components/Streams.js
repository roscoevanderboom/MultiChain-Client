// Services
import React, { useState, useEffect } from 'react';

// Constants

// Components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import StreamBrowser from './streams/StreamBrowser'

// Modal
import CreateStream from '../Modals/CreateStream'

// Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    marginBottom: 12
  },
  actions: {
    width: 400,
    display: 'flex',
    justifyContent: 'space-between'
  },
  select: {
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: 'monospace',
    fontSize: 'large'
  },
  newStreamBtn: {
    marginLeft: 30
  },
  card: {
    margin: '10px 10px'
  }
}));

export default function Streams({ props }) {
  // Style
  const classes = useStyles();
  const [streamDetails, setStreamDetails] = useState(false);

  // State
  const { state, functions } = props;
  const { streams } = state;

  // Functions
  const subscribe = () => {
    state.multichain.subscribe({
      stream: streamDetails.name
    }, (err) => {
      if (err) {
        functions.feedback('error', err.message);
        return
      }
      functions.feedback('success', 'Subscribed to ' + streamDetails.name);
      functions.getChainStreams();
      selectStream(streamDetails.name)
    });
  }
  const unsubscribe = () => {
    state.multichain.unsubscribe({
      stream: streamDetails.name
    }, (err) => {
      if (err) {
        functions.feedback('error', err.message);
        return
      }
      functions.feedback('success', 'Unsubscribed from ' + streamDetails.name);
      functions.getChainStreams();
      selectStream(streamDetails.name)
    });
  }

  const selectStream = (name) => {
    streams.forEach(stream => {
      if (name === stream.name) {
        setStreamDetails(stream)
      }
    });
  }

  // Child props
  const StreamBrowserProps = {
    streams: streams,
    streamDetails: streamDetails,
    selectStream: selectStream,
    subscribe: subscribe,
    unsubscribe: unsubscribe
  }


  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Typography className={classes.actions} variant="h5" component="h3">
          Streams
          <CreateStream props={props} />
          <select onChange={(e) => selectStream(e.target.value)} className={classes.select}>
            <option>Current</option>
            {streams.map(stream =>
              <option key={stream.name} value={stream.name}>{stream.name}</option>)}
          </select>
        </Typography>
      </Paper>
      <Paper className={classes.root}>
        <StreamBrowser props={StreamBrowserProps} />
      </Paper>
    </React.Fragment>
  );
}



