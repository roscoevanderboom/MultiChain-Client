import React from "react";
import { ipcRenderer } from 'electron';
import { Switch, Route } from "react-router-dom";
import { store } from './store';
import checkLocalStorage from './constants/multichain/CheckLocalStorage';

import WindowBar from './components/WindowBar';
import Setup from './containers/Setup';
import Home from './containers/Home';

export default function App() {
    const { hist, reducers, state } = React.useContext(store);
    const { localPaths } = state.multichain_state;

    const handleLocalStorage = () => {

        let { binariesPath, blockchainsPath } = checkLocalStorage();

        reducers.dispatch_multichain_state({
            type: 'SET_LOCAL_PATHS',
            data: { binariesPath, blockchainsPath }
        })
    }


    React.useEffect(() => {
        handleLocalStorage();
        // eslint-disable-next-line
    }, [])

    React.useEffect(() => {
        console.log(localPaths);
        if (localPaths.binariesPath === null) {
            hist.push('/setup/about')
        } else if (localPaths.binariesPath !== null) {
            hist.push('/home/dashboard')
        }
        // eslint-disable-next-line
    }, [localPaths])

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

