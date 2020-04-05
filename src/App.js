import React from "react";
import { ipcRenderer } from 'electron';
import { Switch, Route } from "react-router-dom";

import { store } from './store';

import WindowBar from './components/WindowBar';
import Setup from './containers/Setup';
import Home from './containers/Home';

export default function App() {
    const { hist, reducers } = React.useContext(store);

    const checkLocalStorage = () => {
        let binariesPath = localStorage.getItem('binariesPath');
        let blockchainsPath = localStorage.getItem('blockchainsPath');
        if (binariesPath !== null && blockchainsPath !== null) {
            hist.push('/setup/about');
            return;
        }
        hist.push('/home');
    }

    React.useEffect(() => {
        ipcRenderer.on('multichain:mainWindow', (e, activeChain) => {
            reducers.load_Multichain_Node(activeChain);
        })
    }, []);

    React.useEffect(() => {
        checkLocalStorage();
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

