import React, { useEffect, useContext } from 'react'
import { readdir } from 'fs'
import { ipcRenderer } from 'electron'

// State
import { GlobalState } from '../state/state';

// Containers
import Windowbar from './components/WindowBar';
import Topnav from './Topnav';
import SectionTabs from './SectionTabs';

// Modals
import Modals from './Modals/All-Modals';

require('events').EventEmitter.defaultMaxListeners = 100;

const Root = () => {
  const { state, methods } = useContext(GlobalState);
  const {
    multichain,
    activeChain,
    localChains,
  } = state;
  const {
    getChainList,
    update,
    reset,
    load_credentials,
    openModal
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
    getChainList()
  }, []);

  useEffect(() => {
    if (localChains.length > 0) {
      load_credentials()
    }
  }, [localChains]);

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
      <Topnav activeChain={activeChain} />
      <SectionTabs />
      <Modals />
    </React.Fragment>
  )
}

export default Root;



