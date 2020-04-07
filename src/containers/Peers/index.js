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

    return (state.peers &&
        <Section>
            <SectionHeader>
                Peers
            </SectionHeader>
        </Section>
    )
}