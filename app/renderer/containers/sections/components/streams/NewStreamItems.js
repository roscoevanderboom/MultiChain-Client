// Services
import React, { useState, useContext } from 'react';

// State
import { GlobalState } from '../../../../state/state';

// Actions
import { publish } from '../../../../actions/Streams';

// Components
import {
  Button,
  TextField,
  IconButton,
  Dialog,
  Divider,
  DialogContent,
  DialogActions,
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

export default ({ stream, getStreamList }) => {
  const [open, setOpen] = useState(false);
  const [newkey, setNewKey] = useState(false);
  const [newType, setNewType] = useState('Input Type');
  const [values, setValues] = useState([]);
  const [inputFields, setInputFields] = useState([]);

  const { state, methods } = useContext(GlobalState);
  const { multichain } = state;
  const { feedback } = methods;

  const handleDialog = () => {
    open ? setOpen(false) : setOpen(true);
  }
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
  const handleNewValue = (key) => (e) => {
    let newValues = [...values, {
      key: key,
      value: e.target.value
    }]
    setValues(newValues);
  }

  const handleSubmit = () => {
    let data = {};
    let form = document.getElementById('newStreamItemForm')
    let inputs = form.querySelectorAll('input');
    inputs.forEach((input, index) => {
      data[inputFields[index].key] = input.value;
    });
    let json = JSON.stringify(data);
    publish(multichain, stream, json)
      .then(res => {
        console.log(res)
        feedback('success', 'New item posted');
        getStreamList()
      })
      .catch(err => {
        console.log(err)
        feedback('error', 'Something went wrong')
      })
  }

  return (
    <React.Fragment>
      <Button
        variant='outlined'
        onClick={handleDialog}
        children={'Add Items'} />

      <Dialog open={open} onClose={handleDialog} aria-labelledby="form-dialog-title">
        <Typography variant='h5' component='h5'>Create key value pairs</Typography>
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
        <Divider />
        <DialogContent id='newStreamItemForm'>
          {inputFields.map((input, i) =>
            <ListItem
              style={style.listItem}
              key={input + i}>
              <Typography style={style.key}>{`${input.key}: `}</Typography>
              <div>
                <TextField
                  onChange={handleNewValue(input.key)}
                  type={input.type} />
                <IconButton onClick={removeField(i)} >
                  <Clear />
                </IconButton>
              </div>
            </ListItem>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Post to stream</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
