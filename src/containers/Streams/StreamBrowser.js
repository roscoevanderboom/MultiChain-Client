import React, { useContext, useEffect, useState } from 'react';
import { store } from '../../store';
// Components
import Section from '../../components/Section';
import KeySearch from './streamQueries/KeySearch';
import PubSearch from './streamQueries/PubSearch';
import StreamToolbar from './StreamToolbar';
import ItemDetails from './StreamItems/ItemDetails';
// Material components
import {
    CardContent, Grid, List
} from '@material-ui/core';

// Styles
// import styles from './styles';

const SteamBrowser = () => {
    // Styles
    // const classes = styles();
    // Global state
    const { state } = useContext(store);
    const { multichain_state, streams_state } = state;
    const { streamKeys, streamPublishers, streamItems } = streams_state;
    // Component state
    const [items, setItems] = useState([]);
    const [keys, setKeys] = useState([]);
    const [pub, setPub] = useState('');

    const search = () => {
        let result = [];
        keys.forEach(key => {
            streamItems.forEach(item => {              
                if (item.keys.includes(key) && !result.includes(item)) {
                    result.push(item)
                } 
            });
        })
        return result;
    }

    useEffect(() => {
        setItems(streamItems);
        // eslint-disable-next-line
    }, [streamItems]);

    useEffect(() => {
        if (keys.length === 0 && pub === '') {
            setItems(streamItems)
        }
        setItems(search());
        // eslint-disable-next-line
    }, [keys, pub])

    return (multichain_state.streams &&
        <Section>
            <StreamToolbar />

            <Grid container justify='space-evenly'>

                <Grid item xs={5}>
                    <KeySearch
                        keys={keys}
                        setKeys={setKeys}
                        streamKeys={streamKeys} />
                </Grid>

                <Grid item xs={5}>
                    <PubSearch
                        pub={pub}
                        setPub={setPub}
                        streamPublishers={streamPublishers} />
                </Grid>
            </Grid>

            <CardContent>
                <List>
                    {items.map(item =>
                        <ItemDetails
                            item={item}
                            key={item.txid} />
                    )}
                </List>
            </CardContent>
        </Section>
    )
}
export default SteamBrowser;