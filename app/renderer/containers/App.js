import React, { useState, useEffect } from 'react';

import { ipcRenderer } from 'electron';

// Constants
// import Feedback from '../constants/Feedback';

// Containers
import Windowbar from './WindowBar';
import Topnav from './Topnav';
import SectionTabs from './SectionTabs';

// Modals
import CreateChain from './Modals/create-chains/CreateChain';
import ConnectRemoteChain from './Modals/connect-remote-node/ConnectRemoteChain';

const Root = ({ useSnackbar }) => {
  const [multichain, setMultichain] = useState(false);
  const [localChains, setLocalChains] = useState([]);
  const [activeChain, setActiveChain] = useState(false);
  const [modals, setModals] = useState({
    CreateChain: false,
    ConnectRemoteChain: false,
    NewStreamModal: false
  });

  const { enqueueSnackbar } = useSnackbar();

  const feedback = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };
  const connectNode = (creds) => {
    setMultichain(require("multichain-node")(creds));
  }
  const setCurrentChain = (chain) => {
    setActiveChain(chain)
  }
  const openModal = (modal) => {
    setModals({ ...modals, [modal]: true, })
  }
  const closeModal = (modal) => {
    setModals({ ...modals, [modal]: false, })
  }
  const props = {
    state: { multichain, activeChain, localChains, modals },
    functions: {
      connectNode,
      setCurrentChain,
      openModal,
      closeModal,
      feedback,
    }
  }

  useEffect(() => {
    if (multichain) {
      multichain.getInfo((err, info) => {
        if (err) {
          setCurrentChain(false);
          feedback('Cannot retreive chain data. Start chain first', 'error');
          return;
        }
        setCurrentChain(info.chainname);
      })
    };
  }, [multichain]);


  useEffect(() => {
    ipcRenderer.on('localChains:send', (e, chains) => {
      setLocalChains(chains);
    });

    return () => {
      ipcRenderer.removeAllListeners('localChains:send');
    };
  }, [localChains,]);



  return (
    <React.Fragment>
      <Windowbar props={props} />
      <Topnav props={props} />
      <SectionTabs props={props} />

      <CreateChain props={props} />
      <ConnectRemoteChain props={props} />
    </React.Fragment>
  )
}

export default Root;
