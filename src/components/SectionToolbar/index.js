// Services
import React from 'react';

// Components
import { Toolbar, Grid } from '@material-ui/core';
import styles from './styles'

export default (props) => {
    const classes = styles();
    const { left, center, right } = props;

    return (
        <Toolbar className={classes.toolbar}>
            <Grid container
                justify='center'>
                <Grid item xs={2}
                    className={classes.itemsLeft}>
                    {left}
                </Grid>
                <Grid item xs={8}
                    className={classes.itemsCenter}>
                    {center}
                </Grid>
                <Grid item xs={2}
                    className={classes.itemsRight}>
                    {right}
                </Grid>
            </Grid>
        </Toolbar>
    );
}
