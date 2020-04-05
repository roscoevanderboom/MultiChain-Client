import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import store from '../../store';

import { Toolbar, Button, makeStyles } from '@material-ui/core';
import { primaryGradient, defaultFont } from '../../assets/jss/material-kit-react'

const styles = makeStyles({
    toolbar: {
        ...primaryGradient
    },
    links: {
        color: 'white',
        textDecoration: 'none',
        ...defaultFont
    }
})

function Navigation() {
    const classes = styles();
    const { history } = useContext(store);

    return (
        <Toolbar variant='dense'
            className={classes.toolbar}>           
            <Link to='/home/assets'>
                <Button className={classes.links}>
                    assets
                </Button>
            </Link>
            <Link to='/home/dashboard'>
                <Button className={classes.links}>
                    dashboard
                </Button>
            </Link>
        </Toolbar>
    );
}

export default Navigation;