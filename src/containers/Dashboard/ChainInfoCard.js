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
        if (state.chainInfo) {
            setKeys(Object.keys(state.chainInfo));
            setValues(Object.values(state.chainInfo));
            
        }
    }, [state.chainInfo])

    return (
        <Card title='Chain Info'>
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