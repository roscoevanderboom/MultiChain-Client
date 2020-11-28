import React, { useContext, useState } from 'react';
import { store } from '../../store';
// Components
import { Container, Typography, ListItemText } from '@material-ui/core';
import Button from '../CustomButtons/Button';
import { GoBack } from '../NavButtons';

import Step1 from './Step1';
import Step2 from './Step2';
// Styles
import useStyles from './styles';

const DetectSettings = () => {
    const classes = useStyles();
    const { hist, reducers } = useContext(store);
    const [step, setStep] = useState('step1');
    const [binariesPath, setBinariesPath] = useState('');
    const [blockchainsPath, setBlockchainsPath] = useState('');

    const handleBinaries = (fileNames, folderPath) => {
        console.log('fileNames', fileNames);
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
        if (fileNames[0].includes('multichain.')
            && fileNames.length === 1) {
            setBlockchainsPath(folderPath);
            setStep(null);
            return true
        }
        return false
    }
    const handlefolderPath = (e) => {
        let files = Object.values(e.target.files);
        let file_paths = files.map(file => file.path);
        let file_names = files.map(file => file.name);
        let folderPath = file_paths[0].slice(0, file_paths[0].lastIndexOf('multichain'))

        // if (process.platform === 'win32') {
        //     file_names = files.map(file => file.name.slice(0, -4));
        // }

        if (step === 'step1' && handleBinaries(file_names, folderPath)) {
            return;
        }
        if (step === 'step2' && handleBlockchains(file_names, folderPath)) {
            return;
        }
        window.alert('An error occured. Please try again.');
    }
    const handleApplySettings = () => {
        localStorage.setItem("binariesPath", binariesPath);
        localStorage.setItem("blockchainsPath", blockchainsPath);
        reducers.dispatch_multichain_state({
            type: 'SET_LOCAL_PATHS',
            data: { binariesPath: binariesPath, blockchainsPath: blockchainsPath }
          })
        hist.push('/home/dashboard');
    }

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

export default DetectSettings;