import React, { useEffect, useContext, useState } from 'react';
import { store } from '../../store';
// materialui components
import {
    AppBar, Toolbar, Typography
} from '@material-ui/core'

// custom components
import LeftDrawer from '../LeftDrawer';

// Styles
import useStyles from './styles';

export default () => {
    const classes = useStyles();
    const { state } = useContext(store);

    useEffect(() => {
        console.log(state);        
    }, [state])

    return (
        <AppBar className={classes.appBar}>              
            <Toolbar>
                <LeftDrawer />
                <Typography>
                    {state.title}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
