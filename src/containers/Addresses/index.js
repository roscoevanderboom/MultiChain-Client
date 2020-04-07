import React, { useContext, useEffect } from 'react';
import { store } from '../../store';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
// Styles
// import useStyles from './styles';

export default () => {
    const { reducers, state } = useContext(store);
    // const classes = useStyles();

    useEffect(() => {
        reducers.setTitle('Addresses');
        // eslint-disable-next-line
    }, [])

    return (state.addresses &&
        <Section>
            <SectionHeader>
                Assets
            </SectionHeader>
        </Section>
    )
}