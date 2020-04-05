import React, { useContext, useState, useEffect } from 'react';
import { store } from '../../store';

import Card from '../../components/DashboardCard';
import { Item } from '../../components/CustomListItems';
import { List } from '@material-ui/core';
// Styles
import { cardList } from '../../assets/jss/material-kit-react';
export default () => {
    const { state } = useContext(store);
    const [list, setList] = useState([])

    useEffect(() => {
        if (state.assets) {
            setList(state.assets)
        }
    }, [state.assets])

    return (
        <Card title='Assets'>
            <List style={cardList}>
                {list.map((asset, i) =>
                    <Item key={i} text={asset.name} />
                )}
            </List>
        </Card>
    )
}