// Services
import React, { useState, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import getCreds from '../constants/multichain/GetCreds';
import * as mc_reducers from '../reducers/multichain';
import create_feedback from '../components/Feedback';

export const store = createContext();
export const GlobalStatePovider = (props) => {
  // Router history
  const hist = useHistory();
  // App State
  const [title, setAppBarTitle] = useState('');
  const [multichain, setMultichain] = useState(false);
  const [chain_credentials, setChain_credentials] = useState([]);
  const [localPaths, setLocalPaths] = useState({})

  // Sections State
  const [chainInfo, setChainInfo] = useState(false);
  const [addresses, setAddresses] = useState(false);
  const [params, setParams] = useState(false);
  const [permissions, setPermissions] = useState(false);
  const [peers, setPeers] = useState(false);
  const [assets, setAssets] = useState(false);
  const [streams, setStreams] = useState(false);
  // Reset all section's state
  const setStateArray = [
    setChainInfo,
    setAddresses,
    setParams,
    setPermissions,
    setPeers,
    setAssets,
    setStreams
  ];

  // Methods for user feedback
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const feedback = (variant, message) => {    
    create_feedback(variant, message, enqueueSnackbar, closeSnackbar);
  };

  // Modals
  const [modals, setModals] = useState({
    CreateChain: false,
    ConnectRemote: false,
    SendAsset: false
  })
  const handleModals = (modal, value) => {
    setModals({ ...modals, [modal]: value })
  }

  const reset_sections = () => {
    setStateArray.map(val => val(false))
  }

  // Reducers 
  const handleLocalPaths = (pathNames) => {
    setLocalPaths(pathNames)
  }
  const setTitle = value => {
    setAppBarTitle(value);
  }
  const load_credentials = (localChains) => {
    localChains.forEach(chain => {
      getCreds(chain, localPaths.blockchainsPath)
        .then(creds => {
          setChain_credentials(chain_credentials => [...chain_credentials, creds])
        })
        .catch((err) => {
          feedback('error', err)
        })
    });
  }
  const load_Multichain_Node = (chain) => {
    getCreds(chain, localPaths.blockchainsPath)
      .then(creds => {
        setMultichain(require("multichain-node")(creds))
      })
      .catch((err) => {
        feedback('error', err)
      })
  }
  // Multichain data collection
  const getChainData = (varient) => {
    switch (varient) {
      case 'parameters':
        mc_reducers.getBlockchainParams(multichain, setParams)
        break;
      case 'stream':
        mc_reducers.listStreams(multichain, setStreams)
        break;
      case 'peerInfo':
        mc_reducers.getPeerInfo(multichain, setPeers)
        break;
      case 'assets':
        mc_reducers.listAssets(multichain, setAssets)
        break;
      case 'permissions':
        mc_reducers.listPermissions(multichain, setPermissions)
        break;
      case 'addresses':
        mc_reducers.listAddresses(multichain, setAddresses)
        break;
      case 'info':
        mc_reducers.getInfo(multichain, setChainInfo)
        break;
      default:
        mc_reducers.getBlockchainParams(multichain, setParams)
        mc_reducers.listStreams(multichain, setStreams)
        mc_reducers.getPeerInfo(multichain, setPeers)
        mc_reducers.listAssets(multichain, setAssets)
        mc_reducers.listPermissions(multichain, setPermissions)
        mc_reducers.listAddresses(multichain, setAddresses)
        mc_reducers.getInfo(multichain, setChainInfo)
        break
    }
  }

  // Props from provider
  const state = {
    title,
    multichain,
    chain_credentials,
    localPaths,
    // Sections
    chainInfo,
    addresses,
    params,
    permissions,
    peers,
    assets,
    streams,
    // Modals
    modals
  };
  const setState = {
    setChain_credentials, setMultichain
  }

  const reducers = {
    load_credentials,
    load_Multichain_Node,
    setTitle,
    getChainData,
    reset_sections,
    handleLocalPaths,
    handleModals,
    feedback
  };

  // Create provider
  return (
    <store.Provider
      value={{ state, setState, reducers, hist }}>
      {props.children}
    </store.Provider>
  )
}
