// Services
import React, { useState, useEffect } from 'react';

// Components
import { Card, Grid, Typography, Paper } from '@material-ui/core';

// Constants
import { address_permissions } from '../../../constants/Permissions';


// Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1, 1),
    },
    list: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    text: {
        width: '47%'
    }
}));


export default ({ permissions }) => {
    const classes = useStyles();   

    return (
        <Grid item sm={6} lg={4}>
            <Paper className={styles.paper}>{permission.toUpperCase()}</Paper>
        </Grid>
    );
}
