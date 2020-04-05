// Services
import React, { useState, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import getCreds from '../constants/multichain/GetCreds';
import * as mc_reducers from '../reducers/multichain';

export const store = createContext();
export const GlobalStatePovider = (props) => {
  // Router history
  const hist = useHistory();
  // App State
  const [title, setAppBarTitle] = useState('');
  const [multichain, setMultichain] = useState(false);

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
  ]

  const reset_sections = () => {
    setStateArray.map(val => val(false))
  }

  // Reducers 
  const setTitle = value => {
    setAppBarTitle(value);
  }
  const load_Multichain_Node = (chain) => {
    getCreds(chain)
      .then(creds => {
        setMultichain(require("multichain-node")(creds))
      })
      .catch(() => {
        console.log('error')
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
    // Sections
    chainInfo,
    addresses,
    params,
    permissions,
    peers,
    assets,
    streams
  }

  const reducers = {
    load_Multichain_Node,
    setTitle,
    getChainData,
    reset_sections
  };

  // Create provider
  return (
    <store.Provider
      value={{ state, reducers, hist }}>
      {props.children}
    </store.Provider>
  )
}
