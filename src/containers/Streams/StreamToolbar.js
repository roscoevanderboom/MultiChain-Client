import React, { useContext } from 'react';
import { store } from '../../store';
// Components
import SectionToolbar from '../../components/SectionToolbar';
import Button from '../../components/CustomButtons/Button';
import Details from './StreamDetails';
import NewItem from './StreamItems/NewStreamItems';
// Styles
import styles from './styles';

const Toolbar = () => {
    // Styles
    const classes = styles();
    // Global state
    const { state, hist } = useContext(store);
    const { currentStream } = state.streams_state;;

    const goBack = () => {
        hist.push('/home/streams')
    }

    return (
        <SectionToolbar
            left={
                <Button
                    size='sm'
                    color='info'
                    onClick={goBack}>
                    Back
            </Button>
            }
            center={
                <h2 className={classes.title}>
                    {currentStream.name}
                </h2>
            }
            right={
                <React.Fragment>
                    <NewItem stream={currentStream} />
                    <Details stream={currentStream} />
                </React.Fragment>
            }
        />
    )
}

export default Toolbar;