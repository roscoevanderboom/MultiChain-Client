import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
// import { store } from '../store';
// Components
import { Button } from '@material-ui/core';
// Styles
import useStyles from './styles';

export default () => {
    const classes = useStyles();
    // const { state, setState, reducers, hist } = useContext(store);
    const [title, setTitle] = useState('');
    const handleWindow = action => () => {
        ipcRenderer.send(`windowControl`, action);
    }

    useEffect(() => {
        ipcRenderer.send('window:get-Title');
        ipcRenderer.on('window:send-Title', (e, title) => {
            setTitle(title);
        })
        return()=>{
            ipcRenderer.removeAllListeners();
        }
    }, []);

    return (
        <div className='windowbar'>
            <span className={classes.title}>{title}</span>
            <div className={classes.windowControl}>
                <Button
                    onClick={handleWindow('minimize')}
                    className={classes.minimizeBtn}
                    variant='outlined'>
                    <i className='far fa-window-minimize'></i>
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
