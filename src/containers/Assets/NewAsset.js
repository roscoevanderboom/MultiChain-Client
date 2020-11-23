import React, { useState, useContext, useEffect } from 'react';

// State
import { store } from '../../store';
// Constants
import { listAssets } from '../../reducers/multichain';
// Actions
import { issue } from '../../reducers/assets';

// Components
import {
  TextField,
  DialogContent,
  DialogTitle,
  MenuItem,
  Typography
} from '@material-ui/core';
import Form from '../../components/CustomForm';
import Switch from '../../components/CustomSwitch';
import ButtonModal from '../../components/Modals/ButtonModal';

// Style
const style = {
  restrictions: {
    display: 'flex',
    justifyContent: 'space-evenly'
  }
}

const NewAsset = () => {
  const [open, setOpen] = useState(false);
  const { state, reducers } = useContext(store);
  const { multichain, addresses, chainInfo, localPaths } = state.multichain_state;
  const { feedback } = reducers;
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
    issue({
      chainName: chainInfo.chainname,
      assetDetails, json,
      binaryPath: localPaths.binariesPath
    })
      .then(res => {
        feedback('success', `${assetDetails.asset} asset created.`)
        listAssets(multichain, reducers)
      })
      .catch(err => {
        feedback('error', err.slice(err.indexOf('ge:') + 3))
      })
  };

  useEffect(() => {
    setAssetDetails({
      ...assetDetails,
      restrict
    })
    // eslint-disable-next-line
  }, [restrict])

  useEffect(() => {
    addresses
      ? setAvailable_addresses(addresses)
      : setAvailable_addresses([])
  }, [addresses])

  return (
    <ButtonModal
      title='New Asset'
      open={open}
      onClose={handleModal}>
      <DialogTitle id="form-dialog-title">Create new native assets</DialogTitle>

      <DialogContent
        children={
          <React.Fragment>
            <Typography paragraph>To create an asset that can be re-issued, select "Open".</Typography>
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
              value={assetDetails.address !== undefined ? assetDetails.address : ''}
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
      <DialogContent>
        <Typography variant='h6'>
          Asset Restrictions
  </Typography>
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
      </DialogContent>
      <DialogContent>
        <Typography variant='h6'>
          Asset Details
  </Typography>
        <Form
          feedback={feedback}
          handleSubmit={handleNewAsset}
          handleModal={handleModal} />
      </DialogContent>
    </ButtonModal>
  );
}
export default NewAsset;