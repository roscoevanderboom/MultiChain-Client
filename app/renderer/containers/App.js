import React, { useEffect, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from '../routes';
import { readdir } from 'fs';
import { ipcRenderer } from 'electron';

// State
import { GlobalState } from '../state';

// Containers
import Windowbar from './../components/WindowBar';
import Topnav from '../components/Topnav';

// Modals
import Modals from './Modals/All-Modals';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: '#c5c3c3',
    position: 'fixed',
    top: 100,
    zIndex: '800',
  },
  scroll: {
    overflow: 'scroll',
    height: '86.5vh'
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  text: {
    width: '30%'
  },
  paramsText: {
    width: '47%'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

require('events').EventEmitter.defaultMaxListeners = 100;

const Root = () => {
  const classes = useStyles();
  const { state, methods, history } = useContext(GlobalState);
  const {
    multichain,
    activeChain,
    chainInfo
  } = state;
  const {
    getChainList,
    update,
    reset,
    openModal,
    load_Multichain_Node
  } = methods;

  useEffect(() => {
    readdir(process.resourcesPath, (err, res) => {
      if (!res.includes('multichain')) {
        ipcRenderer.send('download');
        ipcRenderer.on('download:start', () => {
          openModal('Installer')
        })
        ipcRenderer.on('unzip:begin', () => {
          openModal('Installer')
        })
      }
    })
  }, []);

  useEffect(() => {
    ipcRenderer.on('multichain:mainWindow', (e, chainName) => {
      load_Multichain_Node(chainName);
    })
  }, []);

  useEffect(() => {
    getChainList()
  }, []);

  useEffect(() => {
    if (multichain) {
      update()
      return;
    }
    reset();
  }, [multichain]);

  return (
    <React.Fragment>
      <Windowbar />
      <Topnav activeChain={chainInfo.name} />      
      <Switch>
        {routes.map((route, i) =>
          <Route
            exact
            key={i}
            path={route.path}
            render={(props) => <route.component {...props} classes={classes} />} />
        )}
      </Switch>
      <Modals />
    </React.Fragment>
  )
}

export default Root;



