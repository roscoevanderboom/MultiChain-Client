import React, { useContext, useEffect } from 'react';
import { store } from '../../store';
import Section from '../../components/Section';
import SectionToolbar from '../../components/SectionToolbar';
import CreateStream from './CreateStream/index';
import StreamCard from './StreamCard';
import styles from './styles';

const Steams = () => {
    const classes = styles();
    const { reducers, state } = useContext(store);
    const { multichain_state } = state;

    useEffect(() => {
        reducers.setTitle('Streams');
        // eslint-disable-next-line
    }, [])
    
    return (multichain_state.streams &&
        <Section>
            <SectionToolbar
                left={<CreateStream />} />

            <div className={classes.streamCardDiv}>
                {multichain_state.streams.map((stream, i) =>
                    <StreamCard key={i} stream={stream} />
                )}
            </div>
        </Section>
    )
}
export default Steams;