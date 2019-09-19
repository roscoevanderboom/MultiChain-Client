import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';

export default function FormDialog({ props }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [value, setValue] = React.useState('Closed');
  const [details, setDetails] = React.useState(false);

  const { state, functions } = props;

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
    if (!(state.multichain)) {
      functions.feedback('error', 'You are not connected');
      return;
    }
    state.multichain.create({
      type: 'stream',
      name: name,
      open: isOpen,
      details: {
        text: details
      }
    }, (err, res) => {
      if (err) {
        functions.feedback('error', err.message)
        return;
      }
      functions.feedback('success', name + ' created');
      functions.getChainStreams()
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
            autoFocus
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
            helperText="Is stream open or closed"
            margin="normal"
          >
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
