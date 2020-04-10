import React, { useContext } from 'react';
import { store } from '../../store';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { MoreVertOutlined } from '@material-ui/icons'

export default function AddressMenu({ address }) {
    const { state, reducers } = useContext(store);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getaddressbalances = async () => {
        let addressbalances = await state.multichain.getAddressBalances(address)
            .catch((err) => { reducers.feedback('error', err.message) })
        console.log(addressbalances)

    }

    const listAddressTransactions = async () => {
        let addressTransactions = await state.multichain.listAddressTransactions(address)
            .catch((err) => { reducers.feedback('error', err.message) })
        console.log(addressTransactions)
    }
    const listWalletTransactions = () => {
        state.multichain.listWalletTransactions({ count: 100 }, (err, res) => {
            if (err) { reducers.feedback('error', err.message) };
            res.map(val => console.log(val.txid))
        })
    }
    return (
        <div>
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MoreVertOutlined />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={getaddressbalances}>Address balances</MenuItem>
                <MenuItem onClick={listAddressTransactions}>Address Transaction</MenuItem>
                <MenuItem onClick={listWalletTransactions}>list Wallet Transactions</MenuItem>
            </Menu>
        </div>
    );
}