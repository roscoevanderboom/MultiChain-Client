import React, { useState, useContext } from 'react';

// State
import { GlobalState } from '../../../state/state';

// Actions
import { createStream } from '../../../actions/Streams';

// Components
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem
} from '@material-ui/core';


export default ({ getStreamList }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('Closed');
  const [details, setDetails] = useState(false);
  const [streamDetails, setStreamDetails] = useState({
    name: '',
    isOpen: false,
    restrict: {
      write: true,
      read: true,
      offchain: true,
    },
    details: {
      json: {}
    }
  });

  const { state, methods } = useContext(GlobalState);
  const { multichain } = state;
  const { feedback } = methods;

  const options = ['Open', 'Closed']

  const handleModal = () => {
    if (!(multichain)) {
      feedback('error', 'You are not connected');
      return;
    }
    open ? setOpen(false) : setOpen(true);
  }
  const handleName = (e) => {
    setName(e.target.value);
  }
  const handleRestrictRead = (e) => {
    console.log(streamDetails.restrict.read)
  }
  const handleIsOpen = (e) => {
    switch (e.target.value) {
      case 'Open':
        setIsOpen(true);
        setValue('Open');
        break;
      default:
        setIsOpen(false);
        setValue('Closed');
        break;
    }
  }
  const handleDetails = (e) => {
    setDetails(e.target.value);
  }
  const handleSubmit = () => {
    createStream({ name, isOpen, details })
      .then(() => {
        feedback('success', name + ' created');
        getStreamList()
      })
      .catch(err => {
        feedback('error', err.message)
      })
  }

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleModal}>
        New Stream
      </Button>
      <Dialog open={open} onClose={handleModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create stream</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here can be some tips for creating streams.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            id="Name"
            onChange={handleName}
            fullWidth />
          <TextField
            margin="dense"
            label="Details"
            id="Details"
            onChange={handleDetails}
            fullWidth />
          <TextField
            id="selectIsOpen"
            select
            value={streamDetails.isOpen ? 'Open' : 'Closed'}
            onChange={handleIsOpen}
            helperText="Is stream open or closed?"
            margin="normal" >
            {options.map((option, i) => (
              <MenuItem key={i} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          Restrictions:
          <Button onClick={handleRestrictRead} color="primary">
            Read {streamDetails.restrict.read ? 'True' : 'False'}
          </Button>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Create
          </Button>
          <Button onClick={handleModal} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
