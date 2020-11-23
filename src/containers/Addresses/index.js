import React, { useContext, useEffect, useState } from 'react';
import { store } from '../../store';
// reducers
import { getNewAddress } from '../../reducers/addresses';
// Components
import { TextField, } from '@material-ui/core';
import Button from '../../components/CustomButtons/Button';
import Section from '../../components/Section';
import SectionToolbar from '../../components/SectionToolbar';
import Permissions from './Permission-Collapse';
import Transactions from './Transactions-Collapse';
import Balance from './Balance-Collapse';
import AddressSelect from '../../components/CustomSelect/Addresses-Select';
// Styles
import useStyles from './styles';

const Addresses = () => {
    const { reducers, state } = useContext(store);
    const { addresses, multichain } = state.multichain_state;
    const [selected_address, set_selected_address] = useState({});
    const classes = useStyles();

    const handleChange = (e) => {
        let newAddress = addresses.filter(add => add.address.includes(e.target.value));
        if (newAddress.length > 0) {
            set_selected_address(newAddress[0]);
        } else if (newAddress.length === 0) {
            set_selected_address({});
        }
    }

    const handleGetNewAddress = () => {
        getNewAddress({ multichain, reducers })
    }

    useEffect(() => {
        reducers.setTitle('Addresses');
        // eslint-disable-next-line
    }, [])

    return (addresses &&
        <Section>
            <SectionToolbar
                left={
                    <Button onClick={handleGetNewAddress} size='sm' color="github" >New Address</Button>
                }
                center={
                    <React.Fragment>
                        <AddressSelect
                            className={classes.select}
                            value={selected_address.address === undefined ? '' : selected_address.address}
                            onChange={handleChange} />
                        <TextField
                            type='text'
                            fullWidth
                            helperText='Enter an address'
                            className={classes.select}
                            onChange={handleChange} />
                    </React.Fragment>
                } />

            {selected_address.address === undefined ? null :
                <React.Fragment>
                    <Permissions address={selected_address} />
                    <Balance address={selected_address} />
                    <Transactions address={selected_address} />
                </React.Fragment>}
        </Section>
    )
}
export default Addresses;