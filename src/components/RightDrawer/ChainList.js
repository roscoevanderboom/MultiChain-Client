import React, { useContext } from 'react';
import { store } from '../../store';

import { List } from '@material-ui/core';
import ChainButton from './ChainButton';

const ChainList = () => {
    const { state } = useContext(store);

    return (
        <List>
            {state.multichain_state.localChains.map(chain => <ChainButton key={chain} chain={chain} />)}
        </List>
    );
}

export default ChainList;