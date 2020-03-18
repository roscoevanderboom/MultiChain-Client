import React, { useContext, useEffect } from 'react';
import { store } from '../../store';
import { Typography } from '@material-ui/core';
import Section from '../../components/Section';

export default () => {
    const { setState } = useContext(store);

    useEffect(() => {
        setState.setTitle('Chain Info'); 
    }, [])
    
    return (
        <Section>
            <Typography paragraph>
                Chain Info
            </Typography>
        </Section>
    )
}