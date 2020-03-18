// Services
import React, { useState, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import initialState from './initialState';

export const store = createContext();
export const GlobalStatePovider = (props) => {
  // Router history
  const hist = useHistory();
  // General App State
  const [state, setState] = useState(initialState);

  const handleSetup = (value) => {
    setState({ ...state, setupComplete: value })
  }


  const reducers = {
    handleSetup
  };


  // Create provider
  return (
    <store.Provider
      value={{ state, setState, reducers, hist }}>
      {props.children}
    </store.Provider>
  )
}
