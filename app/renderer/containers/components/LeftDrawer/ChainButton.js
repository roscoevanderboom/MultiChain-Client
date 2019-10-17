import React, { useEffect, useState } from 'react';

import { ipcRenderer } from 'electron';

// Components
import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

// Icons
import { Check, Close } from '@material-ui/icons';

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

export default ({ chain, activeChain }) => {
  const classes = useStyles();

  const connect = () => {
    ipcRenderer.send(`chain:connect`, chain)
  }

  const start = () => {
    ipcRenderer.send('chain:start', chain);
  }
  const stop = () => {
    ipcRenderer.send('chain:stop', chain);
  }

  useEffect(() => {

  }, []);

  return (
    <ListItem
      button
      className={chain === activeChain ? classes.active : classes.chainBtn}>

      <ListItemText
        primary={chain}
        onClick={connect} />

      <div className={classes.actionsDiv}>
        <ListItemIcon
          className={classes.actionBtn}
          onClick={start}>
          <Check />
        </ListItemIcon>

        <ListItemIcon
          className={classes.actionBtn}
          onClick={stop}>
          <Close />
        </ListItemIcon>
      </div>

    </ListItem>
  )
};
