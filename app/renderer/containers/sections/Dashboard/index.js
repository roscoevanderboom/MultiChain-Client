// Services
import React, { useContext, useEffect } from 'react';
// State
import { GlobalState } from '../../../state';
// Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

export default (props) => {
    const classes = useStyles();
    const { state } = useContext(GlobalState);
    const { peers } = state;

    useEffect(() => {
        console.log(props);

    }, [])

    return (
        <div>
            Dashboard
        </div>
    );
}
