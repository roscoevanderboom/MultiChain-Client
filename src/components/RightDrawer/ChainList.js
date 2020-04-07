import React, { useEffect, useState, useContext } from 'react';
import { store } from '../../store';
import getLocalChains from '../../constants/multichain/LocalChains';

import { List } from '@material-ui/core';

import ChainButton from './ChainButton';

export default function ChainList() {
    const [list, setList] = useState([]);
    const { reducers } = useContext(store);

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
        // eslint-disable-next-line
    }, [list]);

    return (
        <List>
            {list.map(chain => <ChainButton key={chain} chain={chain} />)}
        </List>
    );
}