import React, { useContext, useEffect } from 'react';
import { store } from '../../store';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';


export default () => {
    const { reducers, state } = useContext(store);

    useEffect(() => {
        reducers.setTitle('Parameters');
        // eslint-disable-next-line
    }, [])

    return (state.params &&
        <Section>
            <SectionHeader>
                Parameters
            </SectionHeader>
        </Section>
    )
}