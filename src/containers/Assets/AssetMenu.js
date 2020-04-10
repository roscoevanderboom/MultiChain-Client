import React, { useState } from 'react';
import {IconButton, Menu, MenuItem} from '@material-ui/core';
import { MoreVertOutlined } from '@material-ui/icons';

export default function AssetMenu(props) {    
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
                <MenuItem onClick={handleModal}>Send Asset</MenuItem>
            </Menu>
        </div>
    );
}