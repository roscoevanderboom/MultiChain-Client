// Services
import React, { useState, createContext } from 'react';
import getCreds from '../constants/multichain/GetCreds';

export const store = createContext();
export const GlobalStatePovider = (props) => {
  // General App State
  const [chain_credentials, setChain_credentials] = useState([]);
  const [multichain, setMultichain] = useState(false);
  const [activeChain, setActiveChain] = useState(false);

  const load_credentials = (localChains) => {
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

  const state = {
    chain_credentials, multichain, activeChain
  }
  const setState = {
    setMultichain, setActiveChain
  }
  const reducers = {
    load_credentials
  };


  // Create provider
  return (
    <store.Provider
      value={{ state, setState, reducers }}>
      {props.children}
    </store.Provider>
  )
}
