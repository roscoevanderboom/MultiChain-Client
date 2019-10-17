import React, { useState, useContext } from 'react';
// State
import { GlobalState } from '../../../state/state';
// IPC
import { ipcRenderer, remote } from 'electron';

// Components
import {
  Modal,
  Backdrop,
  Fade,
  Button,
  TextField
} from '@material-ui/core';

// Styles
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: 600
  },
}));

export default () => {
  const classes = useStyles();
  const [address, setAddress] = useState(false);
  const { state, methods } = useContext(GlobalState);
  const { ConnectRemoteChain } = state.modals;
  const { closeModal } = methods;

  const handleClose = () => {
    closeModal('ConnectRemoteChain');
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
    <React.Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={ConnectRemoteChain}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>

        <Fade in={ConnectRemoteChain}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Connect Remote Chain</h2>
            <TextField
              autoFocus
              margin="dense"
              label="Remote node address"
              onChange={handleName}
              fullWidth />
            <Button onClick={connect}>Connect</Button>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
