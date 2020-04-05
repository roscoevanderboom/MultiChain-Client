import React, { useEffect, useContext } from 'react';
import { ipcRenderer } from 'electron';
import {
    Switch, Route, Redirect
} from "react-router-dom";
import { store } from '../store';
// custom components
import WindowBar from '../components/WindowBar';
import AppBar from '../components/AppBar/index';

import routes from '../routes';

const Home = () => {
    const { state, reducers } = useContext(store);

    useEffect(() => {
        ipcRenderer.send('window:homeWindow');       
    }, []);

    useEffect(() => {
        if (!state.multichain) {
            reducers.reset_sections()
            return;
        }
        reducers.getChainData();
    }, [state.multichain]);

    useEffect(() => {
        if (state.multichain) {            
            // state.multichain.getNetworkInfo((err,res) => {
            //     console.log(res)
            // })
        }
    }, [state.multichain])
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
            <Redirect to='/home/dashboard' />
        </div>
    )
}

export default Home;