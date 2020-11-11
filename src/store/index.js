// Services
import React, { createContext, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// reducers
import mc_reducer from '../reducers/multichain';
import app_reducer from '../reducers/app';
import streams_reducer from '../reducers/streams';
import create_feedback from '../components/Feedback';
// state
import { app, mc_state, stream_state } from './initialState';


export const store = createContext();
export const GlobalStatePovider = (props) => {
  // Router history
  const hist = useHistory();

  // Reducers
  const [app_state, dispatch_app_state] = useReducer(app_reducer, app);
  const [multichain_state, dispatch_multichain_state] = useReducer(mc_reducer, mc_state);
  const [streams_state, dispatch_streams] = useReducer(streams_reducer, stream_state);

  // Methods for user feedback
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const feedback = (variant, message) => {
    create_feedback(variant, message, enqueueSnackbar, closeSnackbar);
  };

  // Reducers 
  const setTitle = value => {
    dispatch_app_state({
      type: 'SET_TITLE',
      data: value
    })
  }
  const handleModals = (modal) => {
    dispatch_app_state({
      type: 'SET_MODAL',
      data: modal
    })
  }

  // Props from provider
  const state = {
    multichain_state,
    app_state,
    streams_state
  };

  const reducers = {
    setTitle,
    handleModals,
    feedback,
    // New reducers
    dispatch_multichain_state,
    dispatch_app_state,
    dispatch_streams
  };

  // Create provider
  return (
    <store.Provider
      value={{ state, reducers, hist }}>
      {props.children}
    </store.Provider>
  )
}
