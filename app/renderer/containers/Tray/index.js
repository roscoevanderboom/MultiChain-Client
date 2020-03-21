import React, { useEffect, useState, useContext } from 'react';
import { ipcRenderer } from 'electron';
import { store } from '../../state/tray';
import getLocalChains from '../../constants/multichain/LocalChains';
import TopBar from '../../components/TrayTopBar';
import ChainButton from './ChainButton';
import { List } from '@material-ui/core';

const Tray = () => {
  const { reducers, state } = useContext(store);
  const [list, setList] = useState([]);

  useEffect(() => {
    let chainPath = localStorage.getItem('blockchainsPath');
    getLocalChains(chainPath)
      .then((chains) => {
        setList(chains);
      })
  }, [])

  useEffect(() => {
    if (list.length > 0) {
      reducers.load_credentials(list)
    }
  }, [list]);

  useEffect(() => {
    if (state.multichain) {    
      ipcRenderer.send('multichain:tray', state.activeChain);
    }
  }, [state.multichain]);

  return (
    <div>
      <TopBar />
      <br />
      <br />
      <List>
        {list.map(chain =>
          <ChainButton
            key={chain}
            chain={chain} />
        )}
      </List>
    </div>
  )
}

export default Tray;