import React, { useContext, useEffect } from 'react';
import { store } from '../../store';
// Components
import SmallCard from './SmallCard';
// Styles
import useStyles from './styles';

const Dashboard = () => {
    const classes = useStyles();
    const { reducers, state } = useContext(store);
    const { streams, assets } = state.multichain_state;

    useEffect(() => {
        reducers.setTitle('Dashboard');
        // eslint-disable-next-line
    }, [])

    return (
        <div className={classes.body}>
            <div className={classes.mainRaised}>
                <SmallCard title="Streams" data={streams} />
                <SmallCard title="Assets" data={assets} />
            </div>
        </div>

    )
}
export default Dashboard;