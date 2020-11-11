import React, { useEffect, useContext, useState } from 'react';
import { store } from '../../store';
// materialui components
import {
    AppBar, Toolbar, Typography, Grid
} from '@material-ui/core'

// custom components
import LeftDrawer from '../LeftDrawer';
import RightDrawer from '../RightDrawer';

// Styles
import useStyles from './styles';

const Appbar = () => {
    const classes = useStyles();
    const { state } = useContext(store);
    const { multichain_state, app_state } = state;
    const [chainName, setChainName] = useState('No blockchain configured')

    useEffect(() => {
        if (multichain_state.chainInfo) {
            setChainName(multichain_state.chainInfo.chainname)
        }
    }, [multichain_state.chainInfo])

    return (
        <AppBar position='fixed' className={classes.appBar}>
            <Toolbar>
                <Grid item sm={3}
                    className={classes.appBarLeftDiv}>
                    <LeftDrawer />
                    <Typography className={classes.title}>
                        {app_state.title}
                    </Typography>
                </Grid>

                <Grid item sm={6}>
                    <Typography
                        align='center'
                        variant='h5'>
                        {chainName}
                    </Typography>
                </Grid>
                <Grid item sm={3}
                    className={classes.appBarRightDiv}>
                    <RightDrawer />
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Appbar;