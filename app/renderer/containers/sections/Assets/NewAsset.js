import React, { useState, useContext, useEffect } from 'react';

// State
import { GlobalState } from '../../../state';

// Actions
import { issue } from '../../../actions/Assets';

// Components
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
} from '@material-ui/core';

import Form from '../../../components/CustomForm';
import Switch from '../../../components/CustomSwitch'

// Style
const style = {
  restrictions: {
    display: 'flex',
    justifyContent: 'space-evenly'
  }
}

export default () => {
  const [open, setOpen] = useState(false);
  const { state, methods } = useContext(GlobalState);
  const { multichain, addresses, activeChain } = state;
  const { feedback, update } = methods;
  const [assetDetails, setAssetDetails] = useState({})
  const [available_addresses, setAvailable_addresses] = useState([])
  const [restrict, setRestrict] = useState({
    open: false,
    send: false,
    receive: false
  })

  const handleModal = () => {
    if (!(multichain)) {
      feedback('You are not connected', 'error');
      return;
    }
    open ? setOpen(false) : setOpen(true);
  }

  const handleChange = (key) => (e) => {
    setAssetDetails({
      ...assetDetails,
      [key]: e.target.value
    })
  }
  const handleSwitch = (e) => {
    setRestrict({
      ...restrict,
      [e.target.value]: restrict[e.target.value] ? false : true,
    })
  }

  const handleNewAsset = (json) => {
    issue(activeChain, assetDetails, json)
      .then(res => {
        console.log(res);
        update('assets')
      })
      .catch(err => {
        feedback('error', err.slice(err.indexOf('error message:')))
      })
  };

  useEffect(() => {
    setAssetDetails({
      ...assetDetails,
      restrict
    })
  }, [restrict])

  useEffect(() => {
    addresses
      ? setAvailable_addresses(addresses)
      : setAvailable_addresses([])
  }, [addresses])

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleModal}>
        New Asset
      </Button>
      <Dialog open={open} onClose={handleModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create new native assets</DialogTitle>
        <DialogContent
          children={
            <React.Fragment>
              <TextField
                autoFocus
                type='text'
                margin="dense"
                label="Asset Name"
                id="assetName"
                onChange={handleChange('asset')}
                fullWidth />
              <TextField
                id="issueAddress"
                select
                value={assetDetails.address !== undefined ? assetDetails.address : 'Select Address'}
                helperText='Select Issue Address'
                onChange={handleChange('address')}
                margin="normal"
                fullWidth>
                {available_addresses.map(add => (
                  <MenuItem key={add.address} value={add.address}>
                    {add.address}
                  </MenuItem>
                ))}
              </TextField>
              <div style={style.restrictions}>
                <TextField
                  type='number'
                  margin="dense"
                  label="Quantity"
                  id="assetQuantity"
                  onChange={handleChange('qty')} />
                <TextField
                  type='text'
                  margin="dense"
                  label="Units"
                  placeholder='0.000001 - 1'
                  id="assetUnits"
                  onChange={handleChange('units')} />
              </div>
            </React.Fragment>
          }
        />
        <DialogContent
          children={
            <React.Fragment>
              <DialogContentText>
                Asset Restrictions
              </DialogContentText>
              <div style={style.restrictions}>
                <Switch
                  checkedValue={restrict.open}
                  handleClick={handleSwitch}
                  switchValue="open" />
                <Switch
                  checkedValue={restrict.send}
                  handleClick={handleSwitch}
                  switchValue="send" />
                <Switch
                  checkedValue={restrict.receive}
                  handleClick={handleSwitch}
                  switchValue="receive" />
              </div>
            </React.Fragment>
          }
        />
        <DialogContent>
          <DialogContentText>
            Asset Details
          </DialogContentText>
          <Form
            feedback={feedback}
            handleSubmit={handleNewAsset}
            handleModal={handleModal} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
