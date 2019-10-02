//
import React, { useEffect } from 'react';
import { ipcRenderer } from 'electron';

// Components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// Icons
import Link from '@material-ui/icons/Link';
import Close from '@material-ui/icons/Close';

// Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  active: {
    border: '2px solid green',
    borderRadius: '8px'
  },
  stopBtn: {
    justifyContent: 'flex-end'
  }
});


const ChainList = ({ props }) => {
  const classes = useStyles();
  const { localChains, activeChain, multichain } = props.state;
  const { feedback, setActiveChain, setMultiChain } = props.functions;


  const connect = (chain) => {
    ipcRenderer.send('chain:connect', chain);
  }
  const start = (chain) => {
    ipcRenderer.send('chain:start', chain);
  }
  const stop = (chain) => {
    ipcRenderer.send('chain:stop', chain);
  }

  useEffect(() => {
    // Response to connect request
    ipcRenderer.on('chain-connect:success', (e, creds) => {
      setMultiChain(creds);
    });
    ipcRenderer.on('chain-connect:fail', (e, response) => {
      feedback(response);
    });

    // Response to start request
    //  No response for start success
    // Need to figure out how to get a response from start promise
    ipcRenderer.on('chain-start:fail', (e, response) => {
      feedback('error', response);
    });

    // Response to stop request
    ipcRenderer.on('chain-stop:success', (e, response) => {
      feedback('success', response);
      setActiveChain(false);
    });
    ipcRenderer.on('chain-stop:fail', (e, response) => {
      feedback('error', response);
    });
  }, [ipcRenderer, feedback])

  return (
    <React.Fragment>
      <List>
        {localChains.map(chain => (
          <ListItem
            className={chain === activeChain ? classes.active : ' '}
            button key={chain}>
            <ListItemIcon
              onClick={() => start(chain)}>
              <Link />
            </ListItemIcon>
            <ListItemText
              onClick={() => connect(chain)}
              primary={chain} />
            <ListItemIcon
              onClick={() => stop(chain)}
              className={classes.stopBtn}>
              <Close />
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  )
}

export default ChainList;
