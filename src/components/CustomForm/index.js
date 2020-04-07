// Services
import React, { useState } from 'react';

// Components
import {
  Button,
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
  },
  footer: {
    paddingTop: 12,
    display: 'flex',
    justifyContent: 'space-between'
  }
}

export default ({ feedback, handleSubmit, handleModal }) => {
  const [inputFields, setInputFields] = useState([]);
  const [newkey, setNewKey] = useState(false);
  const [newType, setNewType] = useState('');

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
      type: newType,
      value: false
    }];
    setInputFields(newInput)
  }
  const removeField = (value) => () => {
    // let newInput = [...inputFields];
    // newInput.splice(i, 1);
    // setInputFields(newInput);
    setInputFields(inputFields.filter(input => input.key !== value.key))
  }
  const handleDetails = (e) => {
    e.preventDefault()
    let data = {};
    let form = document.querySelectorAll('form');
    let keys = form[0].querySelectorAll('p');
    let inputs = form[0].querySelectorAll('input');
    inputs.forEach((input, index) => {
      data[keys[index].textContent] = input.value
    });
    handleSubmit(JSON.stringify(data))
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
      <form onSubmit={handleDetails}>
        {inputFields.map((input, i) =>
          <ListItem style={style.listItem} key={i}>
            <Typography>{`${input.key}`}</Typography>
            <TextField
              placeholder={`${input.type}`}
              type={input.type} />
            <IconButton onClick={removeField(input)} >
              <Clear />
            </IconButton>
          </ListItem>
        )}
      </form>
      <Divider />
      <div style={style.footer}>
        <Button onClick={handleDetails} color="primary">
          Create
        </Button>
        <Button onClick={handleModal} color="primary">
          Cancel
        </Button>
      </div>
    </React.Fragment>
  )
}
