// Services
import React, { useState, createContext } from 'react';
import { useSnackbar } from 'notistack';
// Multichain
import getLocalChains from '../multichain/LocalChains';
import getCreds from '../multichain/GetCreds';

import { address_permissions } from '../constants/Permissions'

export const GlobalState = createContext();
export const GlobalStatePovider = (props) => {
  // General App State
  const [loading, setLoading] = useState(true);
  const [multichain, setMultichain] = useState(false);
  const [localChains, setLocalChains] = useState([]);
  const [chain_credentials, setChain_credentials] = useState([]);
  const [activeChain, setActiveChain] = useState(false);
  const [modals, setModals] = useState({
    CreateChain: false,
    ConnectRemoteChain: false,
    Installer: false
  });

  // Sections State
  const [chainInfo, setChainInfo] = useState(false);
  const [addresses, setAddresses] = useState(false);
  const [params, setParams] = useState(false);
  const [permissions, setPermissions] = useState(false);
  const [peers, setPeers] = useState(false);
  const [assets, setAssets] = useState(false);
  const [streams, setStreams] = useState(false);

  const setStateArray = [
    setChainInfo,
    setAddresses,
    setParams,
    setPermissions,
    setPeers,
    setAssets,
    setStreams
  ]

  const reset = () => {
    setStateArray.map(val => val(false))
  }

  // Methods for user feedback
  const { enqueueSnackbar } = useSnackbar();
  const feedback = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };
  // For modals in the side-panels
  const openModal = (modal) => {
    setModals({ ...modals, [modal]: true, })
  }
  const closeModal = (modal) => {
    setModals({ ...modals, [modal]: false, })
  }

  // Multichain data collection
  const getInfo = () => {
    multichain.getInfo((err, res) => {
      err ? setChainInfo([]) : setChainInfo(res)
    })
  }
  const getBlockchainParams = () => {
    multichain.getBlockchainParams((err, res) => {
      err ? setParams([]) : setParams(res);
    });
  }
  const listAddresses = () => {
    multichain.listAddresses((err, res) => {
      err ? setAddresses([]) : setAddresses(res);
    });
  }
  const listPermissions = () => {
    multichain.listPermissions((err, res) => {
      if (err) {
        setPermissions({});
        return;
      }
      let obj = {}
      address_permissions.map(key => {
        obj[key] = res.filter(val => val.type === key)
      })
      let values = Object.values(obj);
      let sorted_permissions = {};
      address_permissions.map((key, i) => {
        sorted_permissions[key] = values[i].map(val => val.address)
      })
      setPermissions(sorted_permissions);
    });
  }
  const listAssets = () => {
    multichain.listAssets((err, res) => {
      err ? setAssets([]) : setAssets(res);
    });
  }
  const getPeerInfo = () => {
    multichain.getPeerInfo((err, res) => {
      err ? setPeers([]) : setPeers(res);
    });
  }
  const listStreams = () => {
    multichain.listStreams((err, res) => {
      err ? setStreams([]) : setStreams(res);
    });
  }

  const update = (varient) => {
    switch (varient) {
      case 'parameters':
        getBlockchainParams()
        break;
      case 'stream':
        listStreams()
        break;
      case 'peerInfo':
        getPeerInfo()
        break;
      case 'assets':
        listAssets()
        break;
      case 'permissions':
        listPermissions()
        break;
      case 'addresses':
        listAddresses()
        break;
      case 'info':
        getInfo()
        break;
      default:
        getBlockchainParams()
        listStreams()
        getPeerInfo()
        listAssets()
        listPermissions()
        listAddresses()
        getInfo()
        break
    }
  }

  const getChainList = () => {
    getLocalChains()
      .then(chains => setLocalChains(chains))
  }

  const load_credentials = () => {
    localChains.forEach(chain => {
      getCreds(chain)
        .then(creds => {
          setChain_credentials(chain_credentials => [...chain_credentials, creds])
        })
        .catch(() => {
          console.log('error')
        })
    });
  }

  // Build props to pass to components
  const state = {
    loading,
    // General
    multichain,
    activeChain,
    localChains,
    chain_credentials,
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
    // General setState
    setMultichain,
    setActiveChain,
    getChainList,
    load_credentials,
    // UI setState
    openModal,
    closeModal,
    feedback,
    // Sections setState
    update,
    reset
  };


  // Create provider
  return (
    <GlobalState.Provider value={{ state, methods }}>
      {props.children}
    </GlobalState.Provider>
  )
}
