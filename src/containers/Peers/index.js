import React, { useContext, useEffect } from 'react';
import { store } from '../../store';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';

export default () => {
    const { reducers, state } = useContext(store);

    useEffect(() => {
        reducers.setTitle('Peers');
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (state.peers) {
            console.log(state.peers);

        }
    }, [state.peers])

    return (state.peers &&
        <Section>
            <SectionHeader>
                {state.peers.length !== 0 ? null :
                    'No peers connected'}
            </SectionHeader>
        </Section>
    )
}