import React, { useEffect, useState } from 'react';

import { ipcRenderer } from 'electron';

import notIncluded from '../../../constants/NotIncluded'

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
  const { activeChain, activeDaemons } = state;
  const { setMultichain, setActiveChain, setActiveDaemons } = methods;
  const classes = useStyles();
  const [active, setActive] = useState(false)

  const connect = () => {
    ipcRenderer.send(`chain:connect`, chain)
  }
  const daemon = () => {
    if (active) {
      ipcRenderer.send('chain:stop', chain);
      return;
    }
    ipcRenderer.send('chain:start', chain);
  }
  const handleResponse = (res) => {
    if (typeof (res) === 'string') {
      setActive(false);
      setMultichain(false);
      setActiveChain(false);
      return;
    }
    if (typeof (res) === 'object') {
      let arr = activeDaemons;
      notIncluded(arr, chain);
      setActiveDaemons(arr);
      setActive(true);
      return;
    }
  }


  useEffect(() => {
    activeDaemons.includes(chain) ? setActive(true) : setActive(false);
  }, [activeDaemons]);

  useEffect(() => {
    ipcRenderer.on('checkConnectionStatus:response', (e, response) => {
      if (chain === response.chain) {
        handleResponse(response.response);
      }
    });
    // Response to stop request
    ipcRenderer.on('chain-stop:success', (e, response) => {
      if (chain === response.chain) {
        setActive(false);
        setMultichain(false);
        let arr = activeDaemons;
        if (arr.includes(chain)) {
          arr.splice(arr.indexOf(chain), 1);
          setActiveDaemons(arr);
        }
        return;
      }
    });
    ipcRenderer.on('chain-stop:fail', (e, response) => {
      console.log(response);
    });
  }, []);

  return (
    <ListItem
      button
      className={chain === activeChain ? classes.active : classes.chainBtn}>

      <ListItemText
        primary={active ? chain.toUpperCase() : chain}
        onClick={connect} />

      <div className={classes.actionsDiv}>
        <Switch
          checked={active}
          onClick={daemon}
          value="subscribed"
          color="primary"
          inputProps={{ 'aria-label': 'primary checkbox' }} />
      </div>

    </ListItem>
  )
};
