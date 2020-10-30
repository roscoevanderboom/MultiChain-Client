import React, { useContext, useEffect } from 'react';
import { store } from '../../store';
// Components
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import SmallCard from './SmallCard';
import BigCard from './BigCard';
// Styles
import useStyles from './styles';

const Dashboard = () => {
    const classes = useStyles();
    const { reducers, state } = useContext(store);

    useEffect(() => {
        reducers.setTitle('Dashboard');
        // eslint-disable-next-line
    }, [])

    return (
        <div className={classes.body}>
            <SectionHeader>
                Summary
            </SectionHeader>
            <div className={classes.mainRaised}>
                <SmallCard title="Streams" data={state.streams} />
                <SmallCard title="Assets" data={state.assets} />
                <BigCard title="Chain Info" data={state.chainInfo} />
                <BigCard title="Parameters" data={state.params} />
            </div>
        </div>

    )
}
export default Dashboard;