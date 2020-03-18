import React, { useContext, useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
import { store } from '../../store';
// Components
import { Container, Typography, ListItemText } from '@material-ui/core';
import Button from '../CustomButtons/Button';
import { GoBack } from '../NavButtons';

import Step1 from './Step1';
import Step2 from './Step2';
// Styles
import useStyles from './styles';

export default () => {
    const classes = useStyles();
    const { hist } = useContext(store);
    const [step, setStep] = useState('step1');
    const [binariesPath, setBinariesPath] = useState('');
    const [blockchainsPath, setBlockchainsPath] = useState('');

    const handleBinaries = (fileNames, folderPath) => {
        if (fileNames.includes('multichaind')
            && fileNames.includes('multichain-cli')
            && fileNames.length === 2) {
            setBinariesPath(folderPath);
            setStep('step2');
            return true
        }
        return false
    }
    const handleBlockchains = (fileNames, folderPath) => {
        if (fileNames[0] === 'multichain.'
            && fileNames.length === 1) {
            setBlockchainsPath(folderPath);
            setStep(null);
            return true
        }
        return false
    }
    const handlefolderPath = (e) => {
        let files = Object.values(e.target.files)
        let str = e.target.files[0].path;
        let folderPath = str.slice(0, str.lastIndexOf(`\\`) + 1)
        let fileNames = files.map(file => file.name.slice(0, -4));
        if (step === 'step1' && handleBinaries(fileNames, folderPath)) {
            return;
        }
        if (step === 'step2' && handleBlockchains(fileNames, folderPath)) {
            return;
        }
        window.alert('An error occured. Please try again.');
    }
    const handleApplySettings = () => {
        localStorage.setItem("binariesPath", binariesPath);
        localStorage.setItem("blockchainsPath", blockchainsPath);
        hist.push('/home/dashboard');
    }

    useEffect(() => {
        ipcRenderer.send('location:installation-page');
    }, [])

    return (
        <Container className={classes.body}>
            <Typography
                variant='h4'
                component='header'
                align='center'
                className={classes.text}>
                Detect Current Multichain
            </Typography>
            {binariesPath === '' ? null :
                <ListItemText
                    classes={{ root: classes.listItemText }}
                    primary='Binaries folder path'
                    secondary={binariesPath}
                    className={classes.text} />
            }


            {blockchainsPath === '' ? null :
                <ListItemText
                    classes={{ root: classes.listItemText }}
                    primary='Blockchains folder path'
                    secondary={blockchainsPath}
                    className={classes.text} />
            }
            <br />
            {step === 'step1' ? <Step1 handlefolderPath={handlefolderPath} /> : null}
            {step === 'step2' ? <Step2 handlefolderPath={handlefolderPath} /> : null}

            <Container className={classes.actions}>
                {step !== null ? null :
                    <Button
                        block={true}
                        color='github'
                        onClick={handleApplySettings}>
                        Apply settings
                    </Button>
                }
                <GoBack path='/setup/about'>
                    <Button color='danger'>Back</Button>
                </GoBack>
            </Container>
        </Container>
    );
}