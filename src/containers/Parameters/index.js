import React, { useContext, useEffect } from 'react';
import { store } from '../../store';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import SectionToolbar from '../../components/SectionToolbar';
import List from './List';


export default () => {
    const { reducers, state } = useContext(store);

    useEffect(() => {
        reducers.setTitle('Parameters');
        // eslint-disable-next-line
    }, [])

    return (state.params &&
        <Section>
            <SectionToolbar
                left={
                    <SectionHeader>
                        Set runtime params
                    </SectionHeader>
                } />
            <List params={state.params} />
        </Section>
    )
}