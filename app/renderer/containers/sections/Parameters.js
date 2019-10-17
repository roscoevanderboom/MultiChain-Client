// Services
import React, { useState, useEffect, useContext } from 'react';

// State
import { GlobalState } from '../../state/state';
// Actions
import { blockchainParams } from '../../actions/Parameters';

// Components
import MainParams from './components/parameters/Params';
import Consensus from './components/parameters/Consensus';
import Genesis from './components/parameters/Genesis';
import Network from './components/parameters/Network';
import Mining from './components/parameters/Mining';

export default ({ classes }) => {
  const { state, methods } = useContext(GlobalState);
  const { multichain, params } = state;
  const { setParams } = methods;

  useEffect(() => {
    if (!multichain) {
      setParams([]);
      return;
    };
    blockchainParams(multichain)
      .then(res => setParams(res))
      .catch(err => console.log(err))
  }, [multichain])

  return (multichain &&
    <React.Fragment>
      <MainParams params={params} classes={classes} />
      <Consensus params={params} classes={classes} />
      <Genesis params={params} classes={classes} />
      <Network params={params} classes={classes} />
      <Mining params={params} classes={classes} />
    </React.Fragment>
  );
}
