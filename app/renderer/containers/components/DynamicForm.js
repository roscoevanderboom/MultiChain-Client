// Services
import React, { useState, useEffect } from 'react';

// Components
import {
  ListItem,
  TextField,
  IconButton
} from '@material-ui/core';
// Icons
import {
  Add
} from '@material-ui/icons';

const style = {
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 12
  }
}

export default ({ inputsArray, handleNewKey, handleNewType, newkey, newType }) => {

  const checkKeys = () => {
    let result = true;
    let usedKeys = inputsArray.map(input => input.key);
    usedKeys.forEach(key => {
      if (key === newkey) {
        result = false;
        return;
      }
    })
    return result;
  }

  const addField = () => {
    if (newType === 'Input Type' || !newkey) {
      alert('Please enter key and select a type of input');
      return;
    }
    if (!checkKeys()) {
      alert('That key has already been used');
      return;
    }

    let newInput = [...inputFields, {
      key: newkey,
      type: newType
    }];
    setInputFields(newInput)
  }

  useEffect(() => {

  }, [])

  return (
    <React.Fragment>
      <div style={style.actions}>
        <TextField
          autoFocus
          type="text"
          onChange={handleNewKey}
          placeholder="New key" />
        <TextField
          select
          value={newType}
          helperText='Select type of input'
          onChange={handleNewType}>
          <MenuItem value='text'>Text</MenuItem>
          <MenuItem value='date'>Date</MenuItem>
          <MenuItem value='number'>Number</MenuItem>
          <MenuItem value='email'>Email</MenuItem>
        </TextField>
        <IconButton onClick={addField}>
          <Add />
        </IconButton>
      </div>
    </React.Fragment>
  )
}
