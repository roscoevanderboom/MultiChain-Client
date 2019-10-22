// Services
import React, { useState, useContext } from 'react';

// Components
import {
  Divider,
  TextField,
  IconButton,
  ListItem,
  Typography,
  MenuItem
} from '@material-ui/core';
// Icons
import {
  Add, Clear
} from '@material-ui/icons';

const style = {
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 12
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  key: {
    marginRight: 10
  }
}

export default ({ feedback }) => {
  const [inputFields, setInputFields] = useState([]);
  const [newkey, setNewKey] = useState(false);
  const [newType, setNewType] = useState('Input Type');

  const options = ['text', 'date', 'number', 'email', 'time', 'url', 'tel'];

  const handleNewKey = (e) => {
    setNewKey(e.target.value)
  }
  const handleNewType = (e) => {
    setNewType(e.target.value)
  }
  const checkKeys = () => {
    let result = true;
    let usedKeys = inputFields.map(input => input.key);
    usedKeys.forEach(key => {
      if (key === newkey) {
        feedback('error', 'That key has already been used');
        result = false;
      }
    })
    return result;
  }
  const checkInputs = () => {
    let result = true;
    if (newType === 'Input Type' || !newkey) {
      feedback('error', 'Please enter key and select a type of input');
      result = false;
    }
    return result;
  }
  const addField = () => {
    if (!checkInputs() || !checkKeys()) {
      return;
    }
    let newInput = [...inputFields, {
      key: newkey,
      type: newType
    }];
    setInputFields(newInput)
  }
  const removeField = (i) => () => {
    let newInput = [...inputFields];
    newInput.splice(i, 1);
    setInputFields(newInput);
  }

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
          {options.map(option => <MenuItem key={option} value={option}>{option.toUpperCase()}</MenuItem>)}
        </TextField>
        <IconButton onClick={addField}>
          <Add />
        </IconButton>
      </div>
      <Divider />
      <div>
        {inputFields.map((input, i) =>
          <ListItem style={style.listItem} key={i}>
            <Typography className='key' style={style.key}>{`${input.key}: `}</Typography>
            <div>
              <TextField type={input.type} />
              <IconButton onClick={removeField(i)} >
                <Clear />
              </IconButton>
            </div>
          </ListItem>
        )}
      </div>
    </React.Fragment>
  )
}
