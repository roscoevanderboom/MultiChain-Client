// Services
import React, { useEffect, useContext } from 'react';

// State
import { GlobalState } from '../../state/state';

// Actions
import { listStreams } from '../../actions/Streams';

// Components
import { Toolbar, Typography, List } from '@material-ui/core';
import StreamCard from './components/streams/StreamCard';

// Modal
import CreateStream from './components/streams/CreateStream';

export default ({ classes }) => {
  const { state, methods } = useContext(GlobalState);
  const { multichain, streams } = state;
  const { setStreams } = methods;

  const getStreamList = () => {
    listStreams(multichain)
      .then(res => setStreams(res))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (!multichain) {
      setStreams([]);
      return;
    }
    getStreamList()
  }, [multichain])

  return (multichain &&
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" component="h3">
          Streams:
        </Typography>
        <CreateStream getStreamList={getStreamList} />
      </Toolbar>

      <List className={classes.list}>
        {streams.map((stream, i) =>
          <StreamCard key={i} stream={stream} getStreamList={getStreamList} />
        )}
      </List>
    </React.Fragment>
  );
}



