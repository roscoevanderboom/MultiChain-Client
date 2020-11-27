import React, { useContext, useEffect } from 'react';
import { store } from '../../store';
// Components
import Streams from './SmallCard';
import Assets from './SmallCard';
import Stats from './BigCard';
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
                <Streams title="Streams" data={streams} />
                <Assets title="Assets" data={assets} />
                <Stats title="Statistics" data={assets} />
            </div>
        </div>

    )
}
export default Dashboard;