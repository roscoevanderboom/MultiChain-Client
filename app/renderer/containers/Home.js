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

// Styles
import { body } from '../assets/jss/material-kit-react';

const Home = () => {
    const { state } = useContext(store);

    useEffect(() => {
        ipcRenderer.send('window:homeWindow');  
    }, []);
;
    return (
        <div style={{ ...body }}>
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