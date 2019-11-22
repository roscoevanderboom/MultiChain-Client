import React, { useEffect, useState } from 'react';

// Multichain
import { startMultichain, stopMultichain } from '../../multichain/Daemons';

// Components
import {
  ListItem,
  ListItemText,
  Switch,
} from '@material-ui/core';


// Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  active: {
    border: '2px solid green',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  chainBtn: {
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  actionBtn: {
    justifyContent: 'flex-end'
  },
  actionsDiv: {
    display: 'flex'
  },
  connected: {
    backgroundColor: 'steelblue'
  }
});

export default ({ chain, state, methods }) => {
  const { activeChain, chain_credentials } = state;
  const { setActiveChain, setMultichain, feedback } = methods;
  const classes = useStyles();
  const [connected, setConnected] = useState(false)
  const [multichain, setMultichain_Instance] = useState(false)

  const load_Multichain_Node = (setState) => {
    chain_credentials.map(creds => {
      if (creds.name === chain) {
        setState(require("multichain-node")(creds));
        return;
      }
    })
  }

  const connect = () => {
    if (!connected) {
      feedback('error', 'Daemon is not running')
      return;
    }
    load_Multichain_Node(setMultichain);
    setActiveChain(chain);
  }
  const daemon = () => {
    if (connected) {
      stopMultichain(chain)
        .then(res => {
          setConnected(false);
          setMultichain(false);
          setActiveChain
        })
        .catch(err => console.log(err))
      return;
    }
    startMultichain(chain)
      .then(res => {
        setConnected(true);
      })
      .catch(err => console.log(err))
  }


  useEffect(() => {
    load_Multichain_Node(setMultichain_Instance)
  }, [chain_credentials])

  useEffect(() => {
    if (multichain) {
      multichain.getInfo((err, res) => {
        err ? setConnected(false) : setConnected(true)
      })
    }
  }, [multichain])


  return (
    <ListItem
      button
      className={chain === activeChain && connected ? classes.active : classes.chainBtn}>

      <ListItemText
        primary={chain}
        onClick={connect} />

      <div className={classes.actionsDiv}>
        <Switch
          checked={connected}
          onClick={daemon}
          value="start-stop"
          color="primary"
          inputProps={{ 'aria-label': 'primary checkbox' }} />
      </div>

    </ListItem>
  )
};
