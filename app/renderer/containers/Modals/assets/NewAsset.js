import React, { useState, useContext } from 'react';

// State
import { GlobalState } from '../../../state/state';

// Actions
import { listAddresses } from '../../../actions/Addresses';
import { issue } from '../../../actions/Assets';

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

export default ({ getAssetlist }) => {
  const [open, setOpen] = useState(false);
  const { state, methods } = useContext(GlobalState);
  const { multichain, addresses } = state;
  const { feedback } = methods;
  const [assetDetails, setAssetDetails] = useState({
    address: 'Select Issue Address',
    asset: '',
    qty: '',
    details: {
      text: ''
    }
  })

  const handleModal = () => {
    if (!(multichain)) {
      feedback('You are not connected', 'error');
      return;
    }
    open ? setOpen(false) : setOpen(true);
  }

  const handleDetails = (e) => {
    setAssetDetails({
      ...assetDetails,
      details: e.target.value
    })
  }

  const handleIssueAddress = (e) => {
    setAssetDetails({
      ...assetDetails,
      address: e.target.value
    })
  }
  const handleAssetName = (e) => {
    setAssetDetails({
      ...assetDetails,
      name: e.target.value
    })
  }
  const handleQuantity = (e) => {
    setAssetDetails({
      ...assetDetails,
      quantity: e.target.value
    })
  }
  const newAsset = () => {
    issue(multichain, assetDetails)
      .then(() => {
        getAssetlist();
        feedback('success', 'Asset created');
      })
      .catch(err => feedback('error', err.message))
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleModal}>
        New Asset
      </Button>
      <Dialog open={open} onClose={handleModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Assets</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create new native assets
          </DialogContentText>
          <TextField
            autoFocus
            type='text'
            margin="dense"
            label="Asset Name"
            id="assetName"
            onChange={handleAssetName}
            fullWidth />
          <TextField
            id="issueAddress"
            select
            value={assetDetails.address}
            helperText='Select Issue Address'
            onChange={handleIssueAddress}
            margin="normal"
            fullWidth>
            {addresses.map(add => (
              <MenuItem key={add.address} value={add.address}>
                {add.address}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            type='number'
            margin="dense"
            label="Quantity"
            id="assetQuantity"
            onChange={handleQuantity} />
          <TextField
            type='text'
            margin="dense"
            label="Asset details"
            id="details"
            onChange={handleDetails}
            fullWidth />

        </DialogContent>
        <DialogActions>
          <Button onClick={newAsset} color="primary">
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
