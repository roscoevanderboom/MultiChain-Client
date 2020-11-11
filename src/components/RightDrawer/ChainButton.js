import React, { useEffect, useState, useContext } from 'react';
import { store } from '../../store';
// Multichain
import { startMultichain, stopMultichain } from '../../constants/multichain/Daemons';

// Components
import {
  ListItem,
  ListItemText,
  Switch,
  ListItemIcon
} from '@material-ui/core';


// Styles
import { primaryBoxShadow } from '../../assets/jss/material-kit-react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  active: {
    backgroundColor: '#93d2d0',
    ...primaryBoxShadow
  },
});

const ChainButton = ({ chain }) => {
  const classes = useStyles();
  const { state, reducers } = useContext(store);
  const { localPaths, chain_credentials, chainInfo } = state.multichain_state;
  const [connected, setConnected] = useState(false)
  const [multichain, setMultichain_Instance] = useState(false)

  const checkChainStatus = () => {
    chain_credentials.forEach(creds => {
      if (creds.name === chain) {
        setMultichain_Instance(require("multichain-node")(creds));
      }
    })
  }

  const connect = () => {
    if (!connected) {
      reducers.feedback('info', 'Daemon is not running')
      return;
    }
    reducers.dispatch_multichain_state({
      type: 'SET_ACTIVE_CHAIN',
      data: multichain
    })
  }

  const daemon = () => {
    if (connected) {
      stopMultichain(chain, localPaths.binariesPath)
        .then(res => {
          setConnected(false);
          setMultichain_Instance(false);
        })
        .catch(err => reducers.feedback('error', err))
      return;
    }
    startMultichain(chain, localPaths.binariesPath)
      .then(res => {
        setConnected(true);
      })
      .catch(err => reducers.feedback('error', err))
  }

  useEffect(() => {
    checkChainStatus();
    //eslint-disable-next-line
  }, [chain_credentials])

  useEffect(() => {
    if (multichain) {
      multichain.getInfo((err, res) => {
        err ? setConnected(false) : setConnected(true)
      })
    }
  }, [multichain])

  return (
    <ListItem button
      className={chain === chainInfo.chainname ? classes.active : ''}>
      <ListItemText
        className={classes.actionsDiv}
        primary={chain}
        onClick={connect} />

      <ListItemIcon>
        <Switch
          checked={connected}
          onClick={daemon}
          value="start-stop"
          color="primary"
          inputProps={{ 'aria-label': 'primary checkbox' }} />
      </ListItemIcon>
    </ListItem>
  )
};
export default ChainButton;