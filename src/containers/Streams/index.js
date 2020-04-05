import React, { useContext, useEffect, useState } from 'react';
import { store } from '../../store';
import { ListItemText, Grid, ListItem } from '@material-ui/core';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import CustomFrame from '../../components/CustomFrame';
import useStyles from './styles';
export default () => {
    const { reducers, state } = useContext(store);
    const classes = useStyles();
    const [streams, setStreams] = useState([]);

    const [keys, setKeys] = useState([]);
    const [values, setValues] = useState([]);

    useEffect(() => {
        reducers.setTitle('Streams');
    }, [])

    useEffect(() => {
        if (state.streams) {
            console.log(state.streams);
            setStreams(state.streams)
            // setKeys(Object.keys(state.chainInfo));
            // setValues(Object.values(state.chainInfo));



        }
    }, [state.streams])
    return (
        <Section>
            {!state.streams ?
                <CustomFrame url='https://www.multichain.com/developers/data-streams/' /> :
                <React.Fragment>
                    <SectionHeader>
                        Streams
                    </SectionHeader>
                    <Grid container>
                        {streams.map((key, i) =>
                            <ListItem key={i} button>
                                <ListItemText
                                    primary={key.name}
                                    secondary={`${key.subscribed}`} />
                            </ListItem>
                        )}
                    </Grid>
                </React.Fragment>
            }
        </Section>
    )
}