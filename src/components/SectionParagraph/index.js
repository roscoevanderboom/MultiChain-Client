import React from 'react';
import { Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { defaultFont, flex_center_row } from '../../assets/jss/material-kit-react';

const styles = makeStyles({
    text: {
        ...defaultFont,
        width: '60%',
    },
    container: {
        ...flex_center_row
    }
})

const SectionParagraph = (props) => {
    const classes = styles();
    return (
        <Container className={classes.container}>
            <Typography
                paragraph
                variant='body1'
                align='center'
                className={classes.text}>
                {props.children}
            </Typography>
        </Container>
    )
}

export default SectionParagraph;