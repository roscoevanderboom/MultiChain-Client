import React from "react";
import { ipcRenderer } from 'electron';
import { Switch, Route } from "react-router-dom";
import { store } from './store';
import checkLocalStorage from './constants/multichain/CheckLocalStorage';

import WindowBar from './components/WindowBar';
import Setup from './containers/Setup';
import Home from './containers/Home';

export default function App() {
    const { hist, reducers } = React.useContext(store);

    const handleLocalStorage = () => {

        let { binariesPath, blockchainsPath } = checkLocalStorage();

        if (binariesPath !== null && blockchainsPath !== null) {
            reducers.dispatch_multichain_state({
                type: 'SET_LOCAL_PATHS',
                data: { binariesPath, blockchainsPath }
            })
            hist.push('/home/streams');
            return;
        }
        hist.push('/setup/about');        
    }

    React.useEffect(() => {
        ipcRenderer.on('multichain:mainWindow', (e, activeChain) => {
            reducers.load_Multichain_Node(activeChain);
        })
        // eslint-disable-next-line
    }, []);

    React.useEffect(() => {
        handleLocalStorage();
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <WindowBar />
            <Switch>
                <Route path="/setup">
                    <Setup />
                </Route>
                <Route path="/home">
                    <Home />
                </Route>
            </Switch>
        </div>
    );
}

