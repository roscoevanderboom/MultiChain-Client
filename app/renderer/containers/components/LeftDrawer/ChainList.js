//
import React, { useEffect, useContext, useState } from 'react';
import { ipcRenderer } from 'electron';

// State
import { GlobalState } from '../../../state/state';

// Components
import List from '@material-ui/core/List';
import ChainButton from './ChainButton';

// Styles
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  }
});

export default () => {
  const classes = useStyles();
  const { state, methods } = useContext(GlobalState);
  const { localChains, activeDaemons } = state;
  const { feedback, setMultichain } = methods;


  useEffect(() => {
    // Response to connect request
    ipcRenderer.on('chain-connect:success', (e, creds) => {
      setMultichain(require("multichain-node")(creds));
    });
    ipcRenderer.on('chain-connect:fail', (e, response) => {
      feedback('error', response);
    });

    // Response to start request
    ipcRenderer.on('chain-start:success', (e, response) => {
      ipcRenderer.send('chain:checkConnectionStatus', response.chain)
    });
    ipcRenderer.on('chain-start:fail', (e, response) => {
      ipcRenderer.send('chain:checkConnectionStatus', response.chain)
    });


    return () => {
      ipcRenderer.removeAllListeners('chain-connect:success');
      ipcRenderer.removeAllListeners('chain-connect:fail');
      ipcRenderer.removeAllListeners('chain-start:success');
      ipcRenderer.removeAllListeners('chain-start:fail');
      ipcRenderer.removeAllListeners('chain-stop:success');
      ipcRenderer.removeAllListeners('chain-stop:fail');
      ipcRenderer.removeAllListeners('checkConnectionStatus:response');
    };
  }, [])

  return (
    <React.Fragment>
      <List className={classes.list}>
        {localChains.map(chain => (
          <ChainButton
            key={chain}
            chain={chain}
            state={state}
            activeDaemons={activeDaemons}
            methods={methods} />
        ))}
      </List>
    </React.Fragment>
  )
};
