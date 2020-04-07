import React from 'react';

// Components
import { Typography } from '@material-ui/core';
// Styles
import useStyles from './styles';

export default ({ handlefolderPath }) => {
    const classes = useStyles();
    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}