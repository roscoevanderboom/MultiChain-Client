import React, { useContext, useEffect } from 'react';
import { store } from '../../store';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';

export default () => {
    const { reducers, state } = useContext(store);

    useEffect(() => {
        reducers.setTitle('Permissions');
        // eslint-disable-next-line
    }, [])

    return (state.permissions &&
        <Section>
            <SectionHeader>
                Permissions
            </SectionHeader>
        </Section>
    )
}