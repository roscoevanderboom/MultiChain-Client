import React, { useEffect, useContext } from 'react';
import { store } from '../../store';

import { List } from '@material-ui/core';

import ChainButton from './ChainButton';

const ChainList = () => {
    const { reducers, state } = useContext(store);

    useEffect(() => {
        reducers.handleLocalChainList();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (state.localChains.length > 0) {
            reducers.load_credentials(state.localChains)
        }
        // eslint-disable-next-line
    }, [state.localChains]);

    return (
        <List>
            {state.localChains.map(chain => <ChainButton key={chain} chain={chain} />)}
        </List>
    );
}

export default ChainList;