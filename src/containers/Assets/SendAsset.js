import React, { useState, useContext, useEffect } from 'react';
// State
import { store } from '../../store';
// reducers
import { sendAsset } from '../../reducers/assets';
// Components
import { Input } from '@material-ui/core';
import Button from '../../components/CustomButtons/Button';
import Modal from '../../components/Modals/Modal';
import AddressSelect from '../../components/CustomSelect/Addresses-Select'


const SendAsset = ({ props }) => {
    const { asset, open, handleModal } = props;
    const [address, setAddress] = useState('');
    const { state, reducers } = useContext(store);
    const { multichain } = state.multichain_state;
    const [qty, setQty] = useState(0);

    const handleQTY = (e) => {
        setQty(e.target.value)
    }
    function handleAddress(e) {
        setAddress(e.target.value);
    }
    const handleSend = () => {
        sendAsset({ multichain, asset, address, qty, reducers })
    }

    useEffect(() => {
        if (state.addresses) {
            setAddress(state.addresses[0].address)
        }
    }, [state.addresses])

    return (
        <Modal
            name={open}
            closeModal={handleModal}
            body={
                <React.Fragment>
                    <h2 id="transition-modal-title">{`Send ${asset.name}`}</h2>
                    <Input type='number'
                        placeholder='Quantity'
                        onChange={handleQTY} />
                    <br />
                    <br />
                    <AddressSelect
                        value={address}
                        onChange={handleAddress} />
                    <br />
                    <br />
                    <Button
                        color='github'
                        onClick={handleSend}>
                        Send
                    </Button>
                    <Button
                        color='danger'
                        onClick={handleModal}>
                        Cancel
                    </Button>
                </React.Fragment>
            }
        />
    );
}

export default SendAsset;