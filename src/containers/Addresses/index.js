import React, { useContext, useEffect } from 'react';
import { store } from '../../store';
// Components
import { Button } from '@material-ui/core';
import Section from '../../components/Section';
import SectionToolbar from '../../components/SectionToolbar';
import Collapse from '../../components/CustomCollapse/Address-Collapse';
// Styles
// import useStyles from './styles';

export default () => {
    const { reducers, state } = useContext(store);
    // const classes = useStyles();

    const getNewAddress = () => {
        state.multichain.getNewAddress()
            .then((res) => {
                reducers.getChainData('addresses');
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        reducers.setTitle('Addresses');
        // eslint-disable-next-line
    }, [state.addresses])

    return (state.addresses &&
        <Section>
            <SectionToolbar
                left={<Button onClick={getNewAddress} variant="outlined" >New Address</Button>}
                center={`Hello`}
                right={`Right`} />

            {state.addresses.map((add, i) =>
                <Collapse
                    key={i}
                    address={add}
                    state={state} />
            )}
        </Section>
    )
}