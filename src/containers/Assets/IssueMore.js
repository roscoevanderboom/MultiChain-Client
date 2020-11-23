import React, { useContext, useState, useEffect } from 'react';
// Store
import { store } from '../../store';
// Actions
import { issueMore } from '../../reducers/assets';
// components
import MenuItemModal from '../../components/Modals/MenuItemModal';
import Button from '../../components/CustomButtons/Button';
// Material components
import { Typography, TextField, MenuItem } from '@material-ui/core'

const IssueMore = React.forwardRef((props, ref) => {
    const { asset } = props;
    const { state, reducers } = useContext(store);
    const { multichain, addresses } = state.multichain_state;
    const [available_addresses, setAvailable_addresses] = useState([]);
    const [assetDetails, setAssetDetails] = useState({})

    const handleIssueMore = () => {
        issueMore({ multichain, asset, assetDetails, reducers });
    }

    const handleChange = (key) => (e) => {
        setAssetDetails({
            ...assetDetails,
            [key]: e.target.value
        })
    }

    useEffect(() => {
        addresses
            ? setAvailable_addresses(addresses)
            : setAvailable_addresses([])
    }, [addresses])

    return (
        <MenuItemModal title='Issue More'>
            <Typography variant='h5'>{`Issue More  ${asset.name}`}</Typography>
            <TextField
                id="issueAddress"
                select
                value={assetDetails.address !== undefined ? assetDetails.address : ''}
                helperText='Select Issue Address'
                onChange={handleChange('address')}
                margin="normal"
                fullWidth>
                {available_addresses.map(add => (
                    <MenuItem key={add.address} value={add.address}>
                        {add.address}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                type='number'
                margin="dense"
                label="Quantity"
                id="assetQuantity"
                onChange={handleChange('qty')} />
            <div>
                <Button
                    size='sm'
                    variant='outlined'
                    color='github'
                    onClick={handleIssueMore}>
                    Issue
                </Button>
            </div>
        </MenuItemModal>
    )
})

export default IssueMore;