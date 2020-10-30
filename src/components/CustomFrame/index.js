import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    iframe: {
        height: `-webkit-fill-available`,
        width: `-webkit-fill-available`,
        margin: 0,
        padding: 0
    }
})

const CustomFrame = (props) => {
    const { url } = props;
    const classes = useStyles();
    return (
        <iframe className={classes.iframe} title='mc' src={url}></iframe>
    )
}

export default CustomFrame;