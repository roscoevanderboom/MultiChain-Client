import React from 'react';
import { Container } from '@material-ui/core'

export default (props) => {
    return (
        <Container style={{
            paddingTop: 64
        }}>
            {props.children}
        </Container>
    )
}