import React, { useState, useContext } from 'react';

// State
import { GlobalState } from '../../../state/state';

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

export default () => {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  const { state, methods } = useContext(GlobalState);
  const { multichain } = state;
  const { feedback } = methods;

  const handleModal = () => {
    if (!(multichain)) {
      feedback('error', 'You are not connected');
      return;
    }
    open ? setOpen(false) : setOpen(true);
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
      <Button variant="outlined" color="primary" onClick={handleModal}>
        MultiSig
      </Button>
      <Dialog open={open} onClose={handleModal} aria-labelledby="form-dialog-title">
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
          <Button onClick={newMultisig} color="primary">
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
