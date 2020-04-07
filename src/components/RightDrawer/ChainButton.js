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

export default ({ chain }) => {
  const { state, setState } = useContext(store);
  const { chain_credentials, chainInfo, localPaths } = state;
  const { setMultichain } = setState;
  const classes = useStyles();
  const [connected, setConnected] = useState(false)
  const [multichain, setMultichain_Instance] = useState(false)

  const load_Multichain_Node = (setState) => {
    chain_credentials.forEach(creds => {
      if (creds.name === chain) {
        setState(require("multichain-node")(creds));
        return;
      }
    })
  }

  const connect = () => {
    if (!connected) {
      window.alert('Daemon is not running')
      return;
    }
    load_Multichain_Node(setMultichain);
  }
  
  const daemon = () => {
    if (connected) {
      stopMultichain(chain, localPaths.binariesPath)
        .then(res => {
          setConnected(false);
          setMultichain_Instance(false);
        })
        .catch(err => console.log(err))
      return;
    }
    startMultichain(chain, localPaths.binariesPath)
      .then(res => {
        setConnected(true);
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    load_Multichain_Node(setMultichain_Instance);
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
