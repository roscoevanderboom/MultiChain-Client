import React, { useContext, useEffect } from 'react';
import { store } from '../../store';
// Components
import SmallCard from './SmallCard';
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
            <div className={classes.mainRaised}>
                <SmallCard title="Streams" data={state.streams} />
                <SmallCard title="Assets" data={state.assets} />
            </div>
        </div>

    )
}
export default Dashboard;