import React, { useContext, useEffect } from 'react';
import { store } from '../../store';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import CustomFrame from '../../components/CustomFrame';

export default () => {
    const { reducers, state } = useContext(store);

    useEffect(() => {
        reducers.setTitle('Peers');
    }, [])
    
    return (
        <Section>           
            {!state.peers ?
                <CustomFrame url='https://www.multichain.com/developers/peer-handshaking/' /> :
                <SectionHeader>
                Peers
                </SectionHeader>
            }
        </Section>
    )
}