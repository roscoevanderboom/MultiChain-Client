import React, { useContext } from 'react';
// Store
import { store } from '../../store';
// Reducers
import { getaddressbalances, listAddressTransactions, listWalletTransactions } from '../../reducers/addresses';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { MoreVertOutlined } from '@material-ui/icons'

function AddressMenu({ address }) {
    const { state, reducers } = useContext(store);
    const { multichain } = state.multichain_state;
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleGetaddressbalances = () => {
        getaddressbalances({ multichain, address, reducers });
    }

    const handleListAddressTransactions = () => {
        listAddressTransactions({ multichain, address, reducers });
    }
    const handleListWalletTransactions = () => {
        listWalletTransactions({ multichain, reducers });
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
                <MenuItem onClick={handleGetaddressbalances}>Address balances</MenuItem>
                <MenuItem onClick={handleListAddressTransactions}>Address Transaction</MenuItem>
                <MenuItem onClick={handleListWalletTransactions}>list Wallet Transactions</MenuItem>
            </Menu>
        </div>
    );
}

export default AddressMenu;