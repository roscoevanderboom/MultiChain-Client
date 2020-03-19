import React, { useContext, useEffect } from 'react';
import { store } from '../../store';
import { Typography } from '@material-ui/core';
import Section from '../../components/Section';

export default () => {
    const { reducers } = useContext(store);

    useEffect(() => {
        reducers.setTitle('Streams');
    }, [])
    
    
    return (
        <Section>
            <Typography paragraph>
                Streams
            </Typography>
        </Section>
    )
}