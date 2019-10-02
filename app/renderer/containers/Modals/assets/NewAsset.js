import React, { useState, useEffect } from 'react';

// Actions
import listAddresses from '../../../actions/Addresses';

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



export default function FormDialog({ props }) {
  const [open, setOpen] = useState(false);
  const [issueAddress, setIssueAddress] = useState('Select Issue Address');
  const [assetName, setAssetName] = useState(false);
  const [quantity, setQuantity] = useState(false);
  const [details, setDetails] = useState(false);
  const [addresses, setAddresses] = useState([]);

  const { multichain } = props.state;
  const { feedback } = props.functions;

  const list = () => {
    listAddresses(multichain, setAddresses)
  }

  const handleClickOpen = () => {
    setOpen(true);
    list();
  }

  const handleClose = () => {
    setOpen(false);
  }
  const handleDetails = (e) => {
    setDetails(e.target.value);
  }

  const handleIssueAddress = (e) => {
    setIssueAddress(e.target.value)
  }
  const handleAssetName = (e) => {
    setAssetName(e.target.value)
  }
  const handleQuantity = (e) => {
    setQuantity(e.target.value)
  }

  const createAsset = () => {
    if (!(multichain)) {
      feedback('error', 'You are not connected');
      return;
    }
    issue();
  }

  const issue = () => {
    if (!issueAddress || !assetName || !quantity) {
      feedback('error', 'Some inputs are empty');
      return;
    }
    multichain.issue({
      address: issueAddress,
      asset: assetName,
      qty: Number(quantity),
      details: {
        text: details
      }
    }, (err, info) => {
      if (err) {
        feedback('error', err.message);
      };
      console.log(info);
      feedback('success', "Asset created");
    });
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        New Asset
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
            value={issueAddress}
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
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createAsset} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
