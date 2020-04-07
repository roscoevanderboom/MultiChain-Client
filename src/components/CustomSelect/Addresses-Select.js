import React, { useContext } from 'react';
// State
import { store } from '../../store';
// Components
import { MenuItem, TextField } from '@material-ui/core';

export default ({ value, onChange }) => {
  const { state } = useContext(store);
  const { addresses } = state;

  return (
    <TextField
      select
      fullWidth
      value={value}
      helperText={'Select an address'}
      onChange={onChange} >
      {addresses.map((add, i) =>
        <MenuItem value={add.address} key={i}>{add.address}</MenuItem>
      )}
    </TextField>
  )
}


