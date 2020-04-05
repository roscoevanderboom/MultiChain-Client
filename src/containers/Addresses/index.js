import React, { useContext, useEffect } from 'react';
import { store } from '../../store';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import CustomFrame from '../../components/CustomFrame';
// Styles
import useStyles from './styles';

export default () => {
    const { reducers, state } = useContext(store);
    const classes = useStyles();

    useEffect(() => {
        reducers.setTitle('Addresses');
    }, [])

    return (
        <Section>
            {!state.addresses ?
                <CustomFrame url='https://www.multichain.com/developers/multisignature-transactions/' /> :
                <SectionHeader>
                    Assets
                </SectionHeader>
            }
        </Section>
    )
}