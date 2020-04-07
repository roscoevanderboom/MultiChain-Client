import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
// import { store } from '../store';
// Components
import { Button } from '@material-ui/core';
import CustomButton from '../CustomButtons/Button';
// Styles
import useStyles from './styles';

import '../../assets/windowTopBar.css'

export default () => {
    const classes = useStyles();
    // const { state, setState, reducers, hist } = useContext(store);
    const [title, setTitle] = useState('No title');
    const handleWindow = action => () => {
        ipcRenderer.send(`control-window`, action);
    }
    const openBrowser =() =>{
        ipcRenderer.send('browser:open');
    }

    useEffect(() => {
        ipcRenderer.invoke('window:get-Title').then((result) => {
            setTitle(result)
        })
    }, []);

    return (
        <div className='windowbar'>
            <span className={classes.title}>{title}</span>
            <div className={classes.windowControl}>
                <CustomButton justIcon
                    onClick={openBrowser}
                    color='github'>
                    <i className='fas fa-question'></i>
                </CustomButton>

                <Button
                    onClick={handleWindow('minimize')}
                    className={classes.minimizeBtn}
                    variant='outlined'>
                    <i className='far fa-window-minimize'></i>
                </Button>
                <Button
                    onClick={handleWindow('maximize')}
                    className={classes.minimizeBtn}
                    variant='outlined'>
                    <i className="far fa-window-maximize"></i>
                </Button>
                <Button
                    onClick={handleWindow('close')}
                    className={classes.closeBtn}
                    variant='outlined'>
                    <i className='far fa-window-close'></i>
                </Button>
            </div>
        </div>
    );

}
