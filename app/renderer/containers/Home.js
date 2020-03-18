import React, { useEffect } from 'react';
import { ipcRenderer } from 'electron';
import {
    Switch, Route, Redirect
} from "react-router-dom";
// materialui components
import {
    Button, AppBar, Toolbar
} from '@material-ui/core'
// custom components
import WindowBar from '../components/WindowBar';
import LeftDrawer from '../components/LeftDrawer';

import routes from '../routes';

// Styles
import { body, appBarMargin } from '../assets/jss/material-kit-react';

const Home = () => {
    useEffect(() => {
        ipcRenderer.send('window:homeWindow');
        console.log(routes);
        
    }, []);
    return (
        <div style={{ ...body }}>
            <WindowBar />
            <AppBar style={{...appBarMargin}}>
                <Toolbar>
                    <LeftDrawer />
                </Toolbar>
            </AppBar>
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