// Services
import React, { useState, useEffect } from 'react';

// Actions
import listPeers from '../../actions/Peers';

// Components
import { Typography } from '@material-ui/core';
import List from './components/peers/List';


export default function Peers({ props }) {

  const [peers, setPeers] = useState(false);

  const { multichain } = props.state;

  const list = () => {
    listPeers(multichain, setPeers)
  }

  useEffect(() => {
    if (multichain) {
      list()
    }
  }, [multichain])

  return (
    <React.Fragment>
      <Typography variant="h5" component="h3">
        Peers:
    </Typography>
      {!peers ? 'No connected peers' : <List props={peers} />}
    </React.Fragment>
  );
}
