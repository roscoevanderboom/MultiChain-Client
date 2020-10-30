import React from 'react';

import { address_permissions } from '../../constants/multichain/Permissions';
// Components
import { MenuItem, TextField } from '@material-ui/core';

const CustomSelect = ({ value, onChange }) => {

    return (
        <TextField
            select
            fullWidth
            value={value}
            helperText={'Select a permission'}
            onChange={onChange} >            
            {address_permissions.map((permission, i) =>
                <MenuItem value={permission} key={i}>{permission}</MenuItem>
            )}
        </TextField>
    )
}

export default CustomSelect;
