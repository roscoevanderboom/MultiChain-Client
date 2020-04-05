import React from 'react';

// Components
import { Typography } from '@material-ui/core';
// Styles
import useStyles from './styles';

export default ({ handlefolderPath }) => {
    const classes = useStyles();
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