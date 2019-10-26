// Services
import React, { useState, useEffect, useContext } from 'react';
import { ipcRenderer } from 'electron';

// State
import { GlobalState } from '../../../state/state';

// Components
import {
  Paper,
  ListItemText,
  Modal,
  Fade,
  Switch,
  Backdrop
} from '@material-ui/core';

import List from './components/List'

// Styles
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 1),
    margin: 10,
    cursor: 'pointer',
    border: 'solid black 1px',
    width: 100
  },
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
  list: {
    display: 'flex',
    flexWrap: 'wrap',

  },
  text: {
    width: '45%'
  }
}));

export default ({ asset, getAssetlist }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const { state, methods } = useContext(GlobalState);
  const { activeChain } = state;
  const { feedback } = methods;

  const handleModal = () => {
    open ? setOpen(false) : setOpen(true);
  }

  const subscribeToAsset = () => {
    if (!asset.subscribed) {
      ipcRenderer.send('asset:subscribe', { activeChain, asset });
      return;
    }
    ipcRenderer.send('asset:unsubscribe', { activeChain, asset });
  }

  useEffect(() => {
    setSubscribed(asset.subscribed);
  }, [asset])

  useEffect(() => {
    ipcRenderer.on('subscribe:response', (e, res) => {
      getAssetlist()
    });
    ipcRenderer.on('unsubscribe:response', (e, res) => {
      // res ? setSubscribed(false) : setSubscribed(true)
      getAssetlist()
    });
    return () => {
      ipcRenderer.removeAllListeners('subscribe:response');
      ipcRenderer.removeAllListeners('unsubscribe:response');
    }
  }, [])


  return (
    <React.Fragment>
      <Paper className={classes.root} key={'Paper'}>
        <ListItemText
          onClick={handleModal}
          primary='Name:'
          secondary={asset.name} />
        <ListItemText
          onClick={handleModal}
          primary='Open:'
          secondary={`${asset.open}`} />
        <ListItemText
          primary='Subscribed:' />
        <Switch
          checked={subscribed}
          onChange={subscribeToAsset}
          value="subscribed"
          color="primary"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </Paper>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}>
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{asset.details.text}</h2>
            <ListItemText
              primary='Issuetxid'
              secondary={`${asset.issuetxid}`} />
            <List classes={classes} asset={asset} />
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  )
}
