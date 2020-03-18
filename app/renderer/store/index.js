// Services
import React, { useState, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import initialState from './initialState';

export const store = createContext();
export const GlobalStatePovider = (props) => {
  // Router history
  const hist = useHistory();
  // General App State
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
   // General App State
   const [multichain, setMultichain] = useState(false);
   const [localChains, setLocalChains] = useState([]);
   const [activeChain, setActiveChain] = useState(false);

  const state = {
    title,
  }
  const setState = {
    setTitle
  }
  const reducers = {

  };


  // Create provider
  return (
    <store.Provider
      value={{ state, setState, reducers, hist }}>
      {props.children}
    </store.Provider>
  )
}
