// Services
import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';

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

export default ({ props, asset }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const { multichain, activeChain } = props.state;
  const { feedback } = props.functions;

  function handleClickOpen() {
    if (!subscribed) {
      feedback('You have not yet subscribed to this asset', 'warning');
    }
    // alert('You are not subscribed to this asset');

    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const subscribeToAsset = () => {
    ipcRenderer.send('asset:subscribe', { activeChain, asset });
  }

  useEffect(() => {
    setSubscribed(asset.subscribed);
  }, [asset])

  useEffect(() => {
    ipcRenderer.on('subscribe:success', (e, res) => {
      setSubscribed(true);
    });
    ipcRenderer.on('subscribe:fail', (e, res) => {
      console.log(res)
    });
    return () => {
      ipcRenderer.removeAllListeners('subscribe:success');
      ipcRenderer.removeAllListeners('subscribe:fail');
    }
  }, [])


  return (
    <React.Fragment>
      <Paper className={classes.root} key={'Paper'}>
        <ListItemText
          onClick={handleClickOpen}
          primary='Name:'
          secondary={asset.name} />
        <ListItemText
          onClick={handleClickOpen}
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
        onClose={handleClose}
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
