import React, { useState, useContext } from 'react';
// Store
import { store } from '../../store';
// Custom components
import IssueMore from './IssueMore';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreVertOutlined } from '@material-ui/icons';

function AssetMenu(props) {
    const { state, reducers } = useContext(store);
    const { chainInfo, multichain } = state.multichain_state;
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleModal = () => {
        props.setCurrentAsset(props.asset);
        props.handleModal();
        handleClose();
    }
    
    const handleDelete = () => {
        console.log('Delete', props.asset.name);
        console.log(chainInfo.burnaddress);
        multichain.sendAsset({
            asset: props.asset.name,
            address: chainInfo.burnaddress
        }, (err, res) => {
            if (err) {
                reducers.feedback('error', err.message);
                return;
            };
            reducers.feedback('success', 'Asset has been deleted');
        })
    }

    const ref = React.createRef();

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
                onClose={handleClose}>
                <IssueMore ref={ref} asset={props.asset} />
                <MenuItem onClick={handleModal}>Send Asset</MenuItem>
                <MenuItem onClick={handleDelete}>Delete Asset</MenuItem>
            </Menu>
        </div>
    );
}

export default AssetMenu;