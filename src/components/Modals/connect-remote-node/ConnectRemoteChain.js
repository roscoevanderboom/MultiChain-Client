import React, { useState, useContext } from 'react';
// State
import { store } from '../../../store';
// IPC
import { ipcRenderer, remote } from 'electron';

// Components
import {
  Button,
  TextField
} from '@material-ui/core';

import Modal from '../Modal';


export default () => {
  const [address, setAddress] = useState(false);
  const { state, reducers } = useContext(store);
  const { ConnectRemote } = state.modals;
  const { handleModals } = reducers;

  const handleClose = () => {
    handleModals('ConnectRemote', false);
  };
  function handleName(e) {
    setAddress(e.target.value);
  }
  function connect() {
    if (!address) {
      alert('No address given');
      return;
    }
    ipcRenderer.send('chain:start', address);
    setTimeout(() => {
      remote.app.relaunch();
      remote.app.quit();
    }, 3000);
  }

  return (
    <Modal
      name={ConnectRemote}
      closeModal={handleClose}
      body={
        <React.Fragment>
          <h2 id="transition-modal-title">Connect Remote Chain</h2>
          <TextField
            autoFocus
            margin="dense"
            label="Remote node address"
            onChange={handleName}
            fullWidth />
          <Button onClick={connect}>Connect</Button>
        </React.Fragment>
      }
    />
  );
}
