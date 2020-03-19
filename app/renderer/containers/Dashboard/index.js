import React, { useContext, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { store } from '../../store';
import { Typography } from '@material-ui/core';
import Section from '../../components/Section';

export default () => {
    const { reducers } = useContext(store);

    useEffect(() => {
        reducers.setTitle('Dashboard');
    }, [])

    useEffect(() => {
        ipcRenderer.on('mainWindow:message', (e, message) => {
            window.alert(message);
        });
        ipcRenderer.send('window:homeWindow');
        return () => {
            ipcRenderer.removeAllListeners();
        }
    }, [])

    return (
        <Section>
            <Typography paragraph>
                Dashboard
            </Typography>
        </Section>
    )
}