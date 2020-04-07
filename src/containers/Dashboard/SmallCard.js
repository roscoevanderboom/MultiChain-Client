import React, { useContext, useEffect, useState } from 'react';
import { store } from '../../store';

import Card from '../../components/DashboardCard';
import { Item } from '../../components/CustomListItems';
import { List } from '@material-ui/core';
// Styles
import styles from './styles';
export default (props) => {
    const classes = styles();
    const { state } = useContext(store);
    const [data, setData] = useState({
        'Total': 0,
        'Subscribed': 0,
        'Unsubscribed': 0
    })

    useEffect(() => {
        if (props.data) {
            let subscribed = props.data.filter(data => data.subscribed);
            let unsubscribed = props.data.filter(data => !data.subscribed);
            let data = {
                'Total': props.data.length,
                'Subscribed': subscribed.length,
                'Unsubscribed': unsubscribed.length
            }
            setData(data);
        }
    }, [state])

    return (
        <Card title={props.title}>
            <List className={classes.smallCards}>
                <Item text='Total' data={`${data['Total']}`} />
                <Item text='Subscribed' data={`${data['Subscribed']}`} />
                <Item text='Unsubscribed' data={`${data['Unsubscribed']}`} />
            </List>
        </Card>
    )
}