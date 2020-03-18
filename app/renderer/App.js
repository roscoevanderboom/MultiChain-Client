import React from "react";
import { Switch, Route } from "react-router-dom";

import { store } from './store';

import WindowBar from './components/WindowBar';
import Setup from './containers/Setup';
import Home from './containers/Home';

export default function App() {
    const { hist } = React.useContext(store);

    const checkLocalStorage = () => {
        let binariesPath = localStorage.getItem('binariesPath');
        let blockchainsPath = localStorage.getItem('blockchainsPath');
        if (binariesPath !== null && blockchainsPath !== null) {
            hist.push('/home/dashboard');
            return;
        }
        hist.push('/setup/about');
    }

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

