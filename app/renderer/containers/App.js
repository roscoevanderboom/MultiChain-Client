import React, { useEffect, useContext } from 'react'

// State
import { GlobalState } from '../state/state';

// Multichain
import getCreds from '../multichain/GetCreds';
import getLocalChains from '../multichain/LocalChains';
import { getInfo } from '../multichain/Multichain-Functions';

// Containers
import Windowbar from './components/WindowBar';
import Topnav from './Topnav';
import SectionTabs from './SectionTabs';

// Modals
import CreateChain from './Modals/create-chains/CreateChain';
import ConnectRemoteChain from './Modals/connect-remote-node/ConnectRemoteChain';

require('events').EventEmitter.defaultMaxListeners = 100;

const Root = () => {
  const { state, methods } = useContext(GlobalState);
  const {
    multichain,
    activeChain,
    localChains,
  } = state;
  const {
    getChainList,
    update,
    load_credentials
  } = methods;

  useEffect(() => {
    getChainList()
  }, []);

  useEffect(() => {
    if (localChains.length > 0) {
      load_credentials()
    }
  }, [localChains]);

  useEffect(() => {
    if (multichain) {
      update()
    }
  }, [multichain]);

  return (
    <React.Fragment>
      <Windowbar />
      <Topnav activeChain={activeChain} />
      <SectionTabs />
      <CreateChain />
      <ConnectRemoteChain />
    </React.Fragment>
  )
}

export default Root;



