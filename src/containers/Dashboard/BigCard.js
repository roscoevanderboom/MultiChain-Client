import React, { useEffect, useState } from 'react';

import { firstToUppercase } from '../../constants/general';
import Card from '../../components/DashboardCard';
import { ListItemText, Grid } from '@material-ui/core';
// Styles
import styles from './styles';
export default (props) => {
    const classes = styles();
    const [keys, setKeys] = useState([]);
    const [values, setValues] = useState([]);

    useEffect(() => {
        if (props.data) {
            setKeys(Object.keys(props.data));
            setValues(Object.values(props.data));

        }
    }, [props.data])

    return (
        <Card title={props.title}>
        <Grid container
            className={classes.largeCards}>
            {keys.map((key, i) =>
                <Grid key={key} item xs={6}>
                    <ListItemText
                        className={classes.text}
                        primary={`${firstToUppercase(key)}`}
                        secondary={`${values[i]}`} />
                </Grid>
            )}
        </Grid>
    </Card>
    )
}