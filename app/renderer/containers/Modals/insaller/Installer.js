import React, { useState, useContext, useEffect } from 'react';
// State
import { GlobalState } from '../../../state/state';
// IPC
import { ipcRenderer } from 'electron';

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
  const { state, methods } = useContext(GlobalState);
  const { Installer } = state.modals;
  const { closeModal } = methods;
  const [progress, setProgress] = useState(0)
  const [current_action, setCurrent_action] = useState('Downloading source files')

  const handleClose = () => {
    closeModal('Installer');
  };

  useEffect(() => {
    ipcRenderer.on('download:start', () => {
      setCurrent_action('Downloading source files...')
    })
    ipcRenderer.on('download:progress', (e, data) => {
      setProgress((data * 100).toFixed(0))
    })
    return () => {
      ipcRenderer.removeAllListeners('download:start')
      ipcRenderer.removeAllListeners('download:progress')
    }
  }, [])

  useEffect(() => {
    if (progress === `100`) {
      console.log('Download complete')
      ipcRenderer.send('download:complete', true)
    }
  }, [progress])

  useEffect(() => {
    ipcRenderer.on('unzip:begin', (e, unzip) => {
      setCurrent_action(unzip);
    });
    ipcRenderer.on('unzip:complete', (e, unzip) => {
      setProgress(unzip);
      handleClose()
    });
  }, [])

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={Installer}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>

        <Fade in={Installer}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{current_action}</h2>
            <h4>{progress}</h4>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
