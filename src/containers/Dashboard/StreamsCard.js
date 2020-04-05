import React, { useContext, useEffect, useState } from 'react';
import { store } from '../../store';

import Card from '../../components/DashboardCard';
import { Item } from '../../components/CustomListItems';
import { List } from '@material-ui/core';
// Styles
import { cardList } from '../../assets/jss/material-kit-react';
export default () => {
    const { state } = useContext(store);
    const [streamCardData, setStreamCardData] = useState({
        'Total Streams': 0,
        'Subscribed Streams': 0,
        'Unsubscribed Streams': 0
    })

    useEffect(() => {
        if (state.streams) {
            let subscribedStreams = state.streams.filter(stream => stream.subscribed);
            let unsubscribedStreams = state.streams.filter(stream => !stream.subscribed);
            let data = {
                'Total Streams': state.streams.length,
                'Subscribed Streams': subscribedStreams.length,
                'Unsubscribed Streams': unsubscribedStreams.length
            }
            setStreamCardData(data);
        }
    }, [state.streams])

    return (
        <Card title='Streams'>
            <List style={cardList}>
                <Item text='Total Streams' data={`${streamCardData['Total Streams']}`} />
                <Item text='Subscribed Streams' data={`${streamCardData['Subscribed Streams']}`} />
                <Item text='Unsubscribed Streams' data={`${streamCardData['Unsubscribed Streams']}`} />
            </List>
        </Card>
    )
}