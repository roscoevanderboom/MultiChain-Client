import React, { useContext, useEffect } from 'react';
import { store } from '../../store';
import Section from '../../components/Section';
import SectionToolbar from '../../components/SectionToolbar';
import Button from '../../components/CustomButtons/Button';
import List from './List';


const Parameters = () => {
    const { reducers, state } = useContext(store);
    const { params } = state.multichain_state;

    useEffect(() => {
        reducers.setTitle('Parameters');
        // eslint-disable-next-line
    }, [])

    return (params &&
        <Section>
            <SectionToolbar
                left={
                    <Button size='sm' color='github'>
                        Edit runtime params
                    </Button>
                } />
            <List params={params} />
        </Section>
    )
}
export default Parameters;