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
  const [assetName, setAssetName] = useState(false);
  const [quantity, setQuantity] = useState(false);
  const [details, setDetails] = useState(false);
  const [issueAddress, setIssueAddress] = useState('Select Issue Address');
  const [addresses, setAddresses] = useState([]);

  const [assetDetails, setAssetDetails] = useState({})

  const { multichain } = props.state;
  const { feedback, getAssetlist } = props.functions;

  const getAddressList = () => {
    listAddresses(multichain, setAddresses)
  }

  const handleClickOpen = () => {
    if (!(multichain)) {
      feedback('You are not connected', 'error');
      return;
    }
    setOpen(true);
    getAddressList();
  }

  const handleClose = () => {
    setOpen(false);
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
  const issue = () => {
    const { address, name, details, quantity } = assetDetails;

    if (address === undefined || name === undefined || quantity === undefined || details === undefined) {
      feedback('Some inputs are empty', 'error');
      return;
    }


    multichain.issue({
      address: address,
      asset: name,
      qty: Number(quantity),
      details: {
        text: details
      }
    }, (err, info) => {
      if (err) {
        feedback(err.message, 'error');
        return;
      };
      feedback("Asset created", 'success');
      getAssetlist();
    });
  };

  useEffect(() => {
    console.log(assetDetails);
  }, [assetDetails])

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
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={issue} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
