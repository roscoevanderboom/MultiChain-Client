import React, { useEffect, useContext } from 'react';
import { ipcRenderer } from 'electron';
import {
    Switch, Route, Redirect, Link
} from "react-router-dom";
import { store } from '../../store';
// Components
import { Container, Button, Typography, Divider } from '@material-ui/core';
// Styles
import useStyles from './styles';

export default () => {
    const classes = useStyles();
    const { state } = useContext(store);

    useEffect(() => {
        ipcRenderer.send('window:setupWindow');
        return () => {
            ipcRenderer.removeAllListeners()
        }
    }, [state])
    return (
        <Container className={classes.body}>
            <Typography
                variant='h4'
                component='header'
                align='center'
                className={classes.text}>
                Multichain Blockchain Installation
            </Typography>
            <br />
            <Divider light />
            <br />
            <Button
                variant='outlined'
                className={classes.buttons}>
                <Link
                    className={classes.link}
                    to='/setup/detectCurrentSettings'>
                    Detect current Multichain settings
                </Link>
            </Button>
            <br />
            <Button
                variant='outlined'
                className={classes.buttons}>
                <Link
                    className={classes.link}
                    to='/setup/downloadLatest'>
                    Download latest version
                </Link>
            </Button>
        </Container>
    )
}
