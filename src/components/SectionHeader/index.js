import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { sectionTitle } from '../../assets/jss/material-kit-react';

const styles = makeStyles({
    text: {
        ...sectionTitle
    }
})

export default (props) => {
    const classes = styles();
    return (
        <Typography
            align='center'
            component='header'
            variant='h5'
            className={classes.text}>
            {props.children}
        </Typography>
    )
}