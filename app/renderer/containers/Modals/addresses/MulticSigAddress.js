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
  const [count, setCount] = React.useState(0);

  const { multichain } = props.state;
  const { feedback } = props.functions;

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  function hanleSetCount(e) {
    setCount(e.target.value);
  }

  function addAddress() {
    console.log('set Address')
  }

  const newMultisig = () => {
    if (!(multichain)) {
      feedback('error', 'You are not connected');
      return;
    }
    console.log('set newMultisig')
  }



  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        MultiSig
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Multi signiture address</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create an address that is linked to multiple addresses.
            This doesn't work yet. Address fields will added depending on
            user input.
          </DialogContentText>
          <TextField
            autoFocus
            type="number"
            margin="dense"
            label="How many addresses?"
            id="count"
            onChange={hanleSetCount}
            fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={newMultisig} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
