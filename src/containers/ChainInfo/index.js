import React, { useContext, useEffect, useState } from 'react';
import { store } from '../../store';
import { firstToUppercase } from '../../constants/general';
import { getInfo } from '../../reducers/multichain';
// Components
import { ListItemText, Grid } from '@material-ui/core';
import Section from '../../components/Section';
// Styles
import useStyles from './styles';

const Chaininfo = () => {
    // Global state
    const { reducers, state } = useContext(store);
    const { multichain_state } = state;
    // Component state
    const [keys, setKeys] = useState([]);
    const [values, setValues] = useState([]);
    // styles
    const classes = useStyles();

    useEffect(() => {
        reducers.setTitle('Chain Info');
        // eslint-disable-next-line
    }, [])



    useEffect(() => {
        if (state.chainInfo) {
            setKeys(Object.keys(state.chainInfo));
            setValues(Object.values(state.chainInfo));
        }
        // eslint-disable-next-line
    }, [state.chainInfo])

    return (state.chainInfo &&
        <Section>
            <Grid container>
                {keys.map((key, i) =>
                    <Grid key={i} item
                        xs={12} sm={6} md={4}
                        className={classes.gridItem}>
                        <ListItemText
                            className={classes.listItemText}
                            primary={`${firstToUppercase(key)}`}
                            secondary={`${values[i]}`} />
                    </Grid>
                )}
            </Grid>
        </Section>
    )
}
export default Chaininfo;