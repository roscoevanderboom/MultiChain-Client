// Services
import React, { useContext } from 'react';

// State
import { GlobalState } from '../../state/state';

// Components
import { Toolbar, Typography, List } from '@material-ui/core';
import StreamCard from './components/streams/StreamCard';

// Modal
import CreateStream from './components/streams/CreateStream';

export default ({ classes }) => {
  const { state } = useContext(GlobalState);
  const { streams } = state;

  return (streams &&
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" component="h3">
          Streams:
        </Typography>
        <CreateStream />
      </Toolbar>

      <List className={classes.list}>
        {streams.map((stream, i) =>
          <StreamCard key={i} stream={stream} />
        )}
      </List>
    </React.Fragment>
  );
}



