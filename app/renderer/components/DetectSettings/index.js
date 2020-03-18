import React, { useContext, useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
import { Link } from 'react-router-dom';
import { store } from '../../store';
// Components
import { Container, Typography, ListItemText } from '@material-ui/core';
import Button from '../CustomButtons/Button';
import { ApplyButton, BackButton } from '../NavButtons';
// Styles
import useStyles from './styles';

export default () => {
    const classes = useStyles();
    const { state, hist } = useContext(store);
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
        console.log(fileNames);
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
    }

    const Step1 = () => {
        return (
            <div>
                <Typography
                    variant='subtitle1'
                    align='center'
                    className={classes.text}>
                    Select <strong>multihain-cli</strong> and <strong>multichaind</strong> files
                </Typography>
                <Typography
                    variant='subtitle1'
                    align='center'
                    className={classes.text}>
                    <input onChange={handlefolderPath} type="file" multiple />
                </Typography>

            </div>
        )
    }
    const Step2 = () => {
        return (
            <div>
                <Typography
                    variant='subtitle1'
                    align='center'
                    className={classes.text}>
                    Select multichain.conf in the root folder where all blockchains are stored.
                    IMPORTANT: Do not select multichain.conf for a specific blockchain.
                </Typography>
                <Typography
                    variant='subtitle1'
                    align='center'
                    className={classes.text}>
                    <input onChange={handlefolderPath} type="file" />
                </Typography>
            </div>
        )
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
            {step === 'step1' ? <Step1 /> : null}
            {step === 'step2' ? <Step2 /> : null}

            <Container className={classes.actions}>
                {step !== null ? null :
                    <ApplyButton
                        path={'/home/profile'}
                        onClick={handleApplySettings} />
                }
                <BackButton path='/setup/about' />
            </Container>
        </Container>
    );
}