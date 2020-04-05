import React, { useEffect } from 'react';
import { ipcRenderer, shell } from 'electron';
import { Link } from "react-router-dom";
// Components
import { Container, Button, Typography, Divider } from '@material-ui/core';
// Styles
import useStyles from './styles';

export default () => {
    const classes = useStyles();

    const openLink = () =>{
        var url = 'https://github.com/MultiChain/multichain/blob/2.0-dev/mac.md';
        shell.openExternal(url)
    }

    const Mac = () => {
        return (
            <React.Fragment>
                <Typography
                    variant='h5'
                    component='body'
                    align='center'
                    className={classes.text}>
                    No Download Available for Mac
                </Typography>
                <Container className={classes.macTextContainer}>
                    <Typography paragraph
                        
                        component='details'
                        align='center'
                        className={classes.text}>
                        Multichain for MacOS has to be compiled from source. Please follow documentation
                        on <a href='none' onClick={openLink}>Multichain website.</a>
                    </Typography>
                </Container>
            </React.Fragment>
        )
    }

    useEffect(() => {
        ipcRenderer.send('window:setupWindow');
        return () => {
            ipcRenderer.removeAllListeners()
        }
    }, [])
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
            {process.platform === 'darwin' ?
                <Mac /> :
                <Button
                    variant='outlined'
                    className={classes.buttons}>
                    <Link
                        className={classes.link}
                        to='/setup/downloadLatest'>
                        Download latest version
                    </Link>
                </Button>
            }

        </Container>
    )
}
