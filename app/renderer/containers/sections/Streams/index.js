// Services
import React, { useContext } from 'react';

// State
import { GlobalState } from '../../../state';

// Components
import { Toolbar, List } from '@material-ui/core';
import StreamCard from './StreamCard';

// Modal
import CreateStream from './CreateStream';

export default () => {
  const { state } = useContext(GlobalState);
  const { streams } = state;

  return (streams &&
    <React.Fragment>
      <Toolbar>
        <CreateStream />
      </Toolbar>

      <List>
        {streams.map((stream, i) =>
          <StreamCard key={i} stream={stream} />
        )}
      </List>
    </React.Fragment>
  );
}



