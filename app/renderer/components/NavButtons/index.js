import React from 'react';
import { Link } from 'react-router-dom';
import { link } from '../../assets/jss/material-kit-react';

export const GoBack = (props) => {
    return (
        <Link to={props.path}
            style={{ ...link }}>
            {props.children}
        </Link>
    )
}
