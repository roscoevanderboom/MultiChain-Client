import React from 'react';
import { Container, Typography } from '@material-ui/core'

export default () => {
    return (
        <Container style={{
            paddingTop: 64
        }}>
            <Typography paragraph>
                Settings
            </Typography>
        </Container>
    )
}