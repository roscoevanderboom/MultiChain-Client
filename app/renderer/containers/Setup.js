import React, { useEffect } from 'react';
import { ipcRenderer } from 'electron';
import {
    Switch, Route, Redirect
} from "react-router-dom";

// custom components
import About from '../components/About';
import DetectSettings from '../components/DetectSettings';
import DownloadLatest from '../components/DownloadLatest';
// Styles
import { body } from '../assets/jss/material-kit-react';

const Setup = () => {

    useEffect(() => {
        // Send message to Main Process to resize window
        ipcRenderer.send('window:setupWindow');
        return () => {
            ipcRenderer.removeAllListeners();
        }
    }, []);

    return (
        <div style={{ ...body }}>           
            <Switch>
                <Route path="/setup/about">
                    <About />
                </Route>
                <Route path="/setup/detectCurrentSettings">
                    <DetectSettings />
                </Route>
                <Route path="/setup/downloadLatest">
                    <DownloadLatest />
                </Route>
            </Switch>
            <Redirect to='/setup/about' />
        </div>
    )
}

export default Setup;