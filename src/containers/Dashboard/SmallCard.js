import React, { useEffect, useState } from 'react';

import Card from '../../components/DashboardCard';
import { Item } from '../../components/CustomListItems';
import { List } from '@material-ui/core';

const SmallCard = (props) => {
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
    }, [props.data])

    return (
        <Card title={props.title}>
            <List>
                <Item text='Total' data={`${data['Total']}`} />
                <Item text='Subscribed' data={`${data['Subscribed']}`} />
            </List>
        </Card>
    )
}

export default SmallCard;