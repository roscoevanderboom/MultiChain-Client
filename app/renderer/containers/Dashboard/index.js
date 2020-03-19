import React, { useContext, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { store } from '../../store';
import {
    Paper, Card, Typography, Grid, CardContent
} from '@material-ui/core';
import Section from '../../components/Section';
import StreamsCard from './StreamsCard';
import AssetsCard from './AssetsCard';
import ChainInfoCard from './ChainInfoCard';
import ParametersCard from './ParametersCard';
// Styles
import useStyles from './styles';
export default () => {
    const classes = useStyles();
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
            <Paper className={classes.paper}>
                <StreamsCard />
                <AssetsCard />
                <ChainInfoCard />
                <ParametersCard />                
            </Paper>
        </Section >
    )
}