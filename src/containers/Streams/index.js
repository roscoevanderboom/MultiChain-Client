import React, { useContext, useEffect, useState } from 'react';
import { store } from '../../store';
import { Grid } from '@material-ui/core';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import CustomFrame from '../../components/CustomFrame';
import CreateStream from './CreateStream';
import StreamCard from './StreamCard';

export default () => {
    const { reducers, state } = useContext(store);
    const [streams, setStreams] = useState([]);

    useEffect(() => {
        reducers.setTitle('Streams');
    }, [])

    useEffect(() => {
        if (state.streams) {
            setStreams(state.streams)
        }
    }, [state.streams])

    return (
        <Section>
            {!state.streams ?
                <CustomFrame url='https://www.multichain.com/developers/data-streams/' /> :
                <React.Fragment>
                    <SectionHeader>
                        <CreateStream />
                    </SectionHeader>
                    <Grid container>
                        {streams.map((stream, i) =>
                            <Grid item xs={4}
                                key={i}>
                                <StreamCard stream={stream} />
                            </Grid>
                        )}
                    </Grid>
                </React.Fragment>
            }
        </Section>
    )
}