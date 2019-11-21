import React, { useState, useContext, useEffect } from 'react';

// State
import { GlobalState } from '../../../../state/state';

import {
  Button,
  Input,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem
} from '@material-ui/core';

export default () => {
  const [open, setOpen] = useState(false);
  const [selectAddress, setSelectAddress] = useState([]);
  const [pubKeys, setPubkeys] = useState([]);
  const [nRequired, setnRequired] = useState([]);

  const { state, methods } = useContext(GlobalState);
  const { multichain, addresses } = state;
  const { feedback } = methods;

  const handleModal = () => {
    if (!(multichain)) {
      feedback('error', 'You are not connected');
      return;
    }
    open ? setOpen(false) : setOpen(true);
  }

  const hanleSetCount = (source) => (e) => {
    switch (source) {
      case 'public':
        setPubkeys([...pubKeys, 'pubkey'])
        break;
      case 'delete-public':
        setPubkeys(pubKeys.splice(1, 1))
        break;
      case 'local':
        setSelectAddress([...selectAddress, 'local'])
        break;
      case 'delete-local':
        setSelectAddress(selectAddress.splice(1, 1))
        break;
    }
  }

  const addAddress = () => (e) => {
    if (nRequired.includes(e.target.value)) {
      feedback('error', 'That address has been used');
      return;
    }
    setnRequired([...nRequired, e.target.value])
  }

  const newMultisig = (e) => {
    e.preventDefault();
    if (!(multichain)) {
      feedback('error', 'You are not connected');
      return;
    }

    let form = document.querySelector('form');
    let inputs = form.querySelectorAll('input');
    console.log(inputs);
  }

  useEffect(() => {
    let joined = pubKeys.concat(selectAddress);
  }, [pubKeys, selectAddress])

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
          <Button onClick={hanleSetCount('local')} color="primary">
            Add Local Address
          </Button>
          <Button onClick={hanleSetCount('public')} color="primary">
            Add Public Key
          </Button>
          <form onSubmit={newMultisig}>
            {selectAddress.map((val, i) =>
              <DialogActions>
                <TextField
                  select
                  value={''}
                  label='Select Local Address'
                  margin="normal"
                  fullWidth>
                  {addresses.map(add => (
                    <MenuItem
                      key={add.address}
                      onClick={addAddress(add.address)}
                      value={add.address}>
                      {add.address}
                    </MenuItem>
                  ))}
                </TextField>
                <Button onClick={hanleSetCount('delete-local')} color="primary">
                  Delete
                </Button>
              </DialogActions>
            )}
            {pubKeys.map((val, i) =>
              <DialogActions>
                <TextField
                  label='Paste a public key'
                  onChange={addAddress}
                  margin="normal"
                  fullWidth>
                </TextField>
                <Button onClick={hanleSetCount('delete-public')} color="primary">
                  Delete
                </Button>
              </DialogActions>
            )}
          </form>

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
