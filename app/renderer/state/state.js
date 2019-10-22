// Services
import React, { useState, createContext } from 'react';
import { useSnackbar } from 'notistack';

export const GlobalState = createContext();
export const GlobalStatePovider = (props) => {
  // General App State
  const [loading, setLoading] = useState(true);
  const [multichain, setMultichain] = useState(false);
  const [localChains, setLocalChains] = useState([]);
  const [activeChain, setActiveChain] = useState(false);
  const [activeDaemons, setActiveDaemons] = useState([])
  const [modals, setModals] = useState({
    CreateChain: false,
    ConnectRemoteChain: false
  });

  // Sections State
  const [chainInfo, setChainInfo] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [params, setParams] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [peers, setPeers] = useState([]);
  const [assets, setAssets] = useState([]);
  const [streams, setStreams] = useState([]);

  // Methods that use useState
  const { enqueueSnackbar } = useSnackbar();
  const feedback = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };
  const openModal = (modal) => {
    setModals({ ...modals, [modal]: true, })
  }
  const closeModal = (modal) => {
    setModals({ ...modals, [modal]: false, })
  }

  // Build props to pass to components
  const state = {
    loading,
    // General
    multichain,
    activeChain,
    activeDaemons,
    localChains,
    modals,
    // Sections
    chainInfo,
    addresses,
    params,
    permissions,
    peers,
    assets,
    streams
  };

  const methods = {
    setLoading,
    // General
    setMultichain,
    setActiveChain,
    setActiveDaemons,
    setLocalChains,
    openModal,
    closeModal,
    feedback,
    // Sections
    setChainInfo,
    setAddresses,
    setParams,
    setPermissions,
    setPeers,
    setAssets,
    setStreams
  };


  // Create provider
  return (
    <GlobalState.Provider value={{ state, methods }}>
      {props.children}
    </GlobalState.Provider>
  )
}
