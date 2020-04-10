import React, { useContext, useEffect } from 'react';
import { store } from '../../store';
import Section from '../../components/Section';
import SectionToolbar from '../../components/SectionToolbar';
import Button from '../../components/CustomButtons/Button';
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
                    <Button color='github'>
                        Edit runtime params
                    </Button>
                } />
            <List params={state.params} />
        </Section>
    )
}