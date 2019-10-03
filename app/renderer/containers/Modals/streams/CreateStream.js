import React from 'react';

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


export default function NewStreamModal({ props, listStreams }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [value, setValue] = React.useState('Closed');
  const [details, setDetails] = React.useState(false);

  const { multichain } = props.state;
  const { feedback } = props.functions;

  const options = ['Open', 'Closed']

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  function handleName(e) {
    setName(e.target.value);
  }
  function handleIsOpen(e) {
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
  function handleDetails(e) {
    setDetails(e.target.value);
  }

  const newStream = () => {
    if (!(multichain)) {
      feedback('error', 'You are not connected');
      return;
    }
    multichain.create({
      type: 'stream',
      name: name,
      open: isOpen,
      details: {
        text: details
      }
    }, (err, res) => {
      if (err) {
        feedback('error', err.message)
        return;
      }
      feedback('success', name + ' created');
      listStreams()
    });
  }

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        New Stream
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
            value={value}
            onChange={handleIsOpen}
            helperText="Is stream open or closed?"
            margin="normal" >
            {options.map((option, i) => (
              <MenuItem key={i} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={newStream} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}