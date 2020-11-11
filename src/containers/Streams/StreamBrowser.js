import React, { useContext, useEffect } from 'react';
import { store } from '../../store';
import Button from '../../components/CustomButtons/Button';
import Section from '../../components/Section';
import SectionToolbar from '../../components/SectionToolbar';
import styles from './styles';

const SteamBrowser = () => {
    const classes = styles();
    const { reducers, state, hist } = useContext(store);
    const { multichain_state, streams_state } = state;

    const goBack = () => {
        hist.push('/home/streams')
    }


    return (multichain_state.streams &&
        <Section>
            <SectionToolbar
                left={
                    <Button
                        size='sm'
                        color='info'
                        onClick={goBack}>
                        Back
                    </Button>
                }
                center={
                    <h2 className={classes.title}>
                        {streams_state.currentStream.name}
                    </h2>} />


        </Section>
    )
}
export default SteamBrowser;