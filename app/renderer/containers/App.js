import React, { useEffect, useContext } from 'react';
import { ipcRenderer } from 'electron';

// State
import { GlobalState } from '../state/state';

// Actions
import { getInfo } from '../actions/ChainInfo';

// Constants
import notIncluded from '../constants/NotIncluded';

// Containers
import Windowbar from './components/WindowBar';
import Topnav from './Topnav';
import SectionTabs from './SectionTabs';

// Modals
import CreateChain from './Modals/create-chains/CreateChain';
import ConnectRemoteChain from './Modals/connect-remote-node/ConnectRemoteChain';

const Root = () => {
  const { state, methods } = useContext(GlobalState);
  const {
    multichain,
    activeDaemons,
    activeChain,
    localChains,
  } = state;
  const {
    setActiveChain,
    setActiveDaemons,
    setLocalChains,
    feedback,
    setChainInfo
  } = methods;

  useEffect(() => {
    localChains.forEach(chain => {
      ipcRenderer.send('chain:checkConnectionStatus', chain);
    });
  }, [localChains])

  useEffect(() => {
    ipcRenderer.on('localChains:send', (e, chains) => {
      setLocalChains(chains);
    });

    return () => {
      ipcRenderer.removeAllListeners('localChains:send');
    };
  }, [localChains]);

  useEffect(() => {
    if (multichain) {
      getInfo(multichain)
        .then(info => {
          setChainInfo(info)
          setActiveChain(info.chainname)
        })
        .catch(err => {
          setChainInfo([])
          setActiveChain(false);
          feedback('error', 'Cannot retreive chain data. Start chain first');
        })
    };
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
