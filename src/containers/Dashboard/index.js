import React, { useContext, useEffect } from 'react';
import { store } from '../../store';
// Components
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import StreamsCard from './StreamsCard';
import AssetsCard from './AssetsCard';
import ChainInfoCard from './ChainInfoCard';
import ParametersCard from './ParametersCard';
// Styles
import useStyles from './styles';
export default () => {
    const classes = useStyles();
    const { reducers } = useContext(store);

    useEffect(() => {
        reducers.setTitle('Dashboard');
    }, [])

    return (
        <Section>
            <SectionHeader>
                Summary
            </SectionHeader>
            <div className={classes.mainRaised}>
                <StreamsCard />
                <AssetsCard />
                <ChainInfoCard />
                <ParametersCard />
            </div>
        </Section>

    )
}