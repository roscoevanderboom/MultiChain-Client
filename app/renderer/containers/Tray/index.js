import React, { useEffect, useState, useContext } from 'react';
import { store } from '../../store/tray';
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
    console.log(state.chain_credentials);

  }, [state.chain_credentials]);

  useEffect(() => {
    console.log(state.multichain);

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