import React, { useContext, useState, useEffect } from 'react';
import { store } from '../../store';
import { firstToUppercase } from '../../constants/general';
import Card from '../../components/DashboardCard';
import { List, ListItemText } from '@material-ui/core';
// Styles
import { cardList } from '../../assets/jss/material-kit-react';
export default () => {
    const { state } = useContext(store);
    const [keys, setKeys] = useState([]);
    const [values, setValues] = useState([]);

    useEffect(() => {
        if (state.params) {
            setKeys(Object.keys(state.params));
            setValues(Object.values(state.params));
            
        }
    }, [state.params])

    return (
        <Card title='Parameters'>
            <List style={cardList}>
                {keys.map((key, i) =>
                    <ListItemText
                        key={key}
                        primary={`${firstToUppercase(key)}`}
                        secondary={`${values[i]}`} />
                )}
            </List>
        </Card>
    )
}