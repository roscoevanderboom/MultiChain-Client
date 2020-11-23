import React, { useContext } from 'react';
// State
import { store } from '../../store';
// Components
import { MenuItem, TextField } from '@material-ui/core';

const CustomSelect = (props) => {
  const { value, onChange } = props;
  const { state } = useContext(store);
  const { addresses } = state.multichain_state;

  return (
    <TextField
      select
      fullWidth
      value={value}
      helperText={'Select an address'}
      onChange={onChange}
      {...props}>
      {addresses.map((add, i) =>
        <MenuItem
          key={i}          
          value={add.address}>
          {add.address}
        </MenuItem>
      )}
    </TextField>
  )
}

export default CustomSelect;