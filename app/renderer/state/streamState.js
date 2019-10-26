// Services
import React, { useState, createContext, useContext } from 'react';
// State
import { GlobalState } from './state';
// Actions
import { listStreams } from '../actions/Streams';

export const StreamState = createContext();
export const StreamStatePovider = (props) => {
  // Global State State
  const { state, methods } = useContext(GlobalState);
  const { multichain } = state;
  const { setStreams } = methods;
  // Stream STate

  const getStreamList = () => {
    listStreams(multichain)
      .then(res => setStreams(res))
      .catch(err => console.log(err))
  }

  const streamState = {

  }

  const streamMethods = {
    getStreamList,
  };

  // Create provider
  return (
    <StreamState.Provider value={{streamState, streamMethods}}>
      {props.children}
    </StreamState.Provider>
  )
}
