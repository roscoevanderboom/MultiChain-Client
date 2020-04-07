import React, { useContext, useEffect } from 'react';
import { store } from '../../store';
import { Grid } from '@material-ui/core';
import Section from '../../components/Section';
import SectionToolbar from '../../components/SectionToolbar';
import CreateStream from './CreateStream';
import StreamCard from './StreamCard';

export default () => {
    const { reducers, state } = useContext(store);

    useEffect(() => {
        reducers.setTitle('Streams');
        // eslint-disable-next-line
    }, [])

    return (state.streams &&
        <Section>
            <SectionToolbar
                left={<CreateStream />} />
            <Grid container>
                {state.streams.map((stream, i) =>
                    <Grid item xs={4}
                        key={i}>
                        <StreamCard stream={stream} />
                    </Grid>
                )}
            </Grid>
        </Section>
    )
}