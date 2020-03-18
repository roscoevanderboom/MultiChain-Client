import React, { useContext, useEffect } from 'react';
import { store } from '../../store';
import { Typography } from '@material-ui/core';
import Section from '../../components/Section';

export default () => {
    const { state } = useContext(store);

    useEffect(() => {
        console.log(state);        
    }, [state])
    
    return (
        <Section>
            <Typography paragraph>
                Chain Info
            </Typography>
        </Section>
    )
}