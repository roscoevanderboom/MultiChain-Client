import React from "react";
import {
    BrowserRouter as Router,
    Switch, Route, Redirect
} from "react-router-dom";

import { store } from './store';

import WindowBar from './components/WindowBar';
import Setup from './containers/Setup';
import Home from './containers/Home';

export default function App() {
    const { state, hist, reducers } = React.useContext(store);

    const checkLocalStorage = () => {
        let binariesPath = localStorage.getItem('binariesPath');
        let blockchainsPath = localStorage.getItem('blockchainsPath');
        if (binariesPath !== null && blockchainsPath !== null) {
            reducers.handleSetup(true);
        }
    }

    React.useEffect(() => {
        checkLocalStorage();
    }, [])

    return (
        <Router>
            <WindowBar />
            <Switch>
                <Route path="/setup">
                    <Setup />
                </Route>
                <Route path="/home">
                    <Home />
                </Route>
            </Switch>
            {state.setupComplete ? <Redirect to='/home' /> : <Redirect to='/setup' />}
        </Router>
    );
}

