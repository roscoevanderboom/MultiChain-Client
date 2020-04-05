import React from 'react';

import {
    Card, Typography, Grid, CardContent
} from '@material-ui/core';
// Styles
import useStyles from './styles';
export default (props) => {
    const classes = useStyles();

    return (
        <Grid item sm={6}
            className={classes.griditem}>
            <Card className={classes.card}>
                <CardContent >
                    <div className={classes.cardHeader}>
                    <Typography
                        className={classes.cardTitle}
                        variant='h5'
                        align='center'>
                        {props.title}
                    </Typography>
                    </div>
                    {props.children}
                </CardContent>
            </Card>
        </Grid>
    )
}