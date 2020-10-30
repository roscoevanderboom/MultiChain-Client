import React from 'react';
import { Container, Paper } from '@material-ui/core'
// Styles
import useStyles from './styles';

const Section = (props) => {
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <Paper className={classes.paper}>
                {props.children}
            </Paper>
        </Container>
    )
}

export default Section;