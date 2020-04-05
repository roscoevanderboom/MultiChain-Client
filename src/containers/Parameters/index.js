import React, { useContext, useEffect } from 'react';
import { store } from '../../store';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import CustomFrame from '../../components/CustomFrame';

export default () => {
    const { reducers, state } = useContext(store);

    useEffect(() => {
        reducers.setTitle('Parameters');
    }, [])

    return (
        <Section>
            {!state.params ?
                <CustomFrame url='https://www.multichain.com/developers/blockchain-parameters/' /> :
                <SectionHeader>
                    Parameters
                </SectionHeader>
            }

        </Section>
    )
}