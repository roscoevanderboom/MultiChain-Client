import React, { useEffect, useContext } from 'react';
import { ipcRenderer } from 'electron';
import { Switch, Route } from "react-router-dom";
import { store } from '../store';
// Data collection methods
import getLocalChains from '../constants/multichain/LocalChains';
import getCreds from '../constants/multichain/GetCreds';
// Multichain State
import * as mc from '../reducers/multichain';
// custom components
import WindowBar from '../components/WindowBar';
import AppBar from '../components/AppBar/index';
import Modals from '../components/Modals/All-Modals';

import routes from '../routes';

const Home = () => {
    const { state, reducers } = useContext(store);
    const { multichain_state } = state;
    const { localChains, localPaths, multichain } = multichain_state;

    let chainPath = localStorage.getItem('blockchainsPath');

    // Collect local chains list
    const handleLocalChainList = () => {
        getLocalChains(chainPath)
            .then((chains) => {
                reducers.dispatch_multichain_state({
                    type: 'SET_LOCAL_CHAINS_LIST',
                    data: chains
                })
            })
    }
    // collect local chains credentials
    const handleCredentials = () => {
        localChains.forEach(chain => {
            getCreds(chain, localPaths.blockchainsPath)
                .then(creds => {
                    reducers.dispatch_multichain_state({
                        type: 'SET_CHAIN_CREDENTIALS',
                        data: creds
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        });
    }

    useEffect(() => {
        ipcRenderer.send('window:homeWindow');
    }, []);


    useEffect(() => {
        if (localPaths.blockchainsPath !== undefined && localPaths.blockchainsPath !== null) {
            console.log('checking for chains');
            handleLocalChainList()
        } else if (localPaths.blockchainsPath === null) {
            reducers.handleModals('CreateChain');
        }
        // eslint-disable-next-line
    }, [localPaths]);


    useEffect(() => {
        if (localChains.length > 0) {
            handleCredentials()
        }
        // eslint-disable-next-line
    }, [localChains])

    useEffect(() => {
        if (multichain) {
            mc.getInfo(multichain, reducers);
            mc.getBlockchainParams(multichain, reducers);
            mc.listAddresses(multichain, reducers);
            mc.listPermissions(multichain, reducers);
            mc.listAssets(multichain, reducers);
            mc.getPeerInfo(multichain, reducers);
            mc.listStreams(multichain, reducers);
        }
        // eslint-disable-next-line
    }, [multichain]);

    return (
        <div>
            <WindowBar />
            <AppBar />
            <Switch>
                {routes.map((route, i) => (
                    <Route
                        key={i}
                        path={`/home/${route.path}`}
                        component={route.component} />
                ))}
            </Switch>
            <Modals />
        </div>
    )
}

export default Home;