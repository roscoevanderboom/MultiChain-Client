import React, { useEffect, useState, useContext } from 'react';
import { store } from '../../store';
// Multichain
import { startMultichain } from '../../constants/multichain/Daemons';

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

  const setChainCreds = () => {
    chain_credentials.forEach(creds => {
      if (creds.name === chain) {
        setMultichain_Instance(require("multichain-node")(creds));
      }
    })
  }

  const checkChainStatus = () => {
    multichain.getInfo((err, res) => {
      if (err) {
        setConnected(false);
        return;
      }
      setConnected(true);
    })
  }

  const connect = () => {
    if (!multichain) {
      setChainCreds();;
      return;
    }

    multichain.getInfo((err, res) => {
      if (err) {
        reducers.feedback('info', 'Daemon is not running')
        return;
      }
      reducers.dispatch_multichain_state({
        type: 'SET_ACTIVE_CHAIN',
        data: multichain
      })
    })
  }

  const daemon = () => {
    if (connected) {
      multichain.stop()
        .then(() => {
          setConnected(false);
          setMultichain_Instance(false);
        })
        .catch((err) => {
          console.log(err);
        })
      return;
    }
    startMultichain(chain, localPaths.binariesPath)
      .then(res => {
        setConnected(true);
      })
      .catch(err => {
        reducers.feedback('error', err)
      })
  }

  useEffect(() => {
    setChainCreds();
    //eslint-disable-next-line
  }, [chain_credentials])

  useEffect(() => {
    if (multichain) {
      checkChainStatus();
    }
    //eslint-disable-next-line
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