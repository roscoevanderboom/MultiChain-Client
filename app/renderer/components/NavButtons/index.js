import React from 'react';
import { Link } from 'react-router-dom';

import { link } from '../../assets/jss/material-kit-react';
import Button from "../CustomButtons/Button";

export const BackButton = ({ path }) => {
    return (
        <Link to={path}
            style={{ ...link }}>
            <Button color='danger'>Back</Button>
        </Link>
    )
}

export const ApplyButton = ({ path, onClick }) => {
    return (
        <Link
            to={path}
            style={{ ...link }}>
            <Button
                block={true}
                color='github'
                onClick={onClick}>
                Apply settings
            </Button>
        </Link>
    )
}