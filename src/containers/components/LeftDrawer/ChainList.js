//
import React, { useEffect } from 'react';
import { ipcRenderer } from 'electron';

// Components
import List from '@material-ui/core/List';
import ChainButton from './ChainButton';

export default ({ props, classes }) => {
  const { localChains } = props.state;
  const { connectNode, feedback, setCurrentChain } = props.functions;

  useEffect(() => {
    // Response to connect request
    ipcRenderer.on('chain-connect:success', (e, creds) => {
      connectNode(creds);
    });
    ipcRenderer.on('chain-connect:fail', (e, response) => {
      feedback(response);
    });

    // Response to start request
    ipcRenderer.on('chain-start:success', (e, response) => {
      console.log(response);
    });
    ipcRenderer.on('chain-start:fail', (e, response) => {
      let error = response.slice(response.indexOf('ERROR:'))
      feedback(error, 'error');
    });

    // Response to stop request
    ipcRenderer.on('chain-stop:success', (e, response) => {
      feedback(response, 'success');
      setCurrentChain(false);
    });
    ipcRenderer.on('chain-stop:fail', (e, response) => {
      feedback(response, 'error');
    });
    return () => {
      ipcRenderer.removeAllListeners('chain-connect:success');
      ipcRenderer.removeAllListeners('chain-connect:fail');
      ipcRenderer.removeAllListeners('chain-start:success');
      ipcRenderer.removeAllListeners('chain-start:fail');
      ipcRenderer.removeAllListeners('chain-stop:success');
      ipcRenderer.removeAllListeners('chain-stop:fail');
    };
  }, [])

  return (
    <React.Fragment>
      <List className={classes.list}>
        {localChains.map(chain => (
          <ChainButton key={chain} props={props} chain={chain} />
        ))}
      </List>
    </React.Fragment>
  )
};
