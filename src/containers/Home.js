import React, { useEffect, useContext } from 'react';
import { ipcRenderer } from 'electron';
import { Switch, Route } from "react-router-dom";
import { store } from '../store';
// Data collection methods
import chainPath from '../constants/multichain/Chainpaths';
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
    const { localChains, localPaths, multichain, chain_credentials } = multichain_state;

    // Collect local chains list
    const handleLocalChainList = () => {
        console.log('Handle Chains');
        mc.getChainsList({ chainPath, reducers });
    }
    // collect local chains credentials
    const handleCredentials = () => {
        console.log('Handle Credentials');
        mc.setCredentials({ localChains, localPaths, reducers });
    }

    useEffect(() => {
        ipcRenderer.send('window:homeWindow');
    }, []);

    useEffect(() => {
        if (localPaths.binariesPath !== null && localPaths.blockchainsPath !== null) {
            handleLocalChainList();
        }
        // eslint-disable-next-line
    }, [localPaths]);

    useEffect(() => {
        if (localChains.length > 0) {
            handleCredentials();
        }
        // eslint-disable-next-line
    }, [localChains]);

    useEffect(() => {
        if (multichain) {
            mc.collectAllData(multichain, reducers);
        }
        // eslint-disable-next-line
    }, [multichain]);

    useEffect(() => {
        console.log(localChains);
        // eslint-disable-next-line
    }, [localChains]);

    useEffect(() => {
        console.log(chain_credentials);
        // eslint-disable-next-line
    }, [chain_credentials]);

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