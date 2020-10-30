// Services
import React, { useState, useContext } from 'react';

// State
import { store } from '../../../store';

// Components
import {
  Button,
  Dialog,
  DialogContent,
  Input,
  Typography,
  Switch
} from '@material-ui/core';

import CustomForm from '../../../components/CustomForm';
import AddressSelect from '../../../components/CustomSelect/Addresses-Select';


// Style
const style = {
  keys: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  btn: {
    marginLeft: 4
  }
}

const NewStreamItem = ({ stream, updateAll }) => {
  const [open, setOpen] = useState(false);
  const [keys, setKeys] = useState([]);
  const [address, setAddress] = useState('');
  const [offchain, setOffchain] = useState(false)

  const { state, reducers } = useContext(store);
  const { multichain } = state;

  const handleModal = () => {
    open ? setOpen(false) : setOpen(true);
  }

  const handleSetKey = (e) => {
    if (e.key === ' ') {
      setKeys([...keys, e.target.value.trim()]);
      e.target.value = ''
    }
  }
  const handleRemoveKey = (e) => {
    let newKeys = keys.filter(key => key !== e.target.textContent)
    setKeys(newKeys);
  }
  const handleAddress = (e) => {
    setAddress(e.target.value)
  }
  const handleOffchain = () => {
    setOffchain(offchain ? false : true)
  }

  const handleSubmit = (json) => {
    multichain.publishFrom({
      from: address,
      stream: stream.name,
      key: keys,
      data: {
        json: json
      },
      options: offchain ? 'offchain' : ''
    })
      .then(() => { updateAll() })
      .catch(err => { reducers.feedback('error', err.message) })
  }

  return (
    <React.Fragment>
      <Button
        variant='outlined'
        onClick={handleModal}
        children={'Publish Detailed Item'} />

      <Dialog open={open} onClose={handleModal} aria-labelledby="form-dialog-title">
        <DialogContent>
          <Typography variant='h5' component='h5'>Publishing Address</Typography>
          <AddressSelect
            value={address}
            onChange={handleAddress} />
          <br></br>
          <Typography variant='h6' component='h6'>Offchain</Typography>
          <Switch checked={offchain} onClick={handleOffchain} />
          <br></br>
          <Typography variant='h5' component='h5'>Item Keys</Typography>
          <Input
            fullWidth={true}
            onKeyPress={handleSetKey}
            placeholder='Enter a key word, press space to set key.'>
          </Input>
          <div style={style.keys}>
            {keys.map(key =>
              <Button
                key={key}
                style={style.btn}
                variant='outlined'
                onClick={handleRemoveKey}
                children={key} />)}
          </div>
          <br></br>
          <Typography variant='h5' component='h5'>Item Details</Typography>
          <CustomForm
            handleModal={handleModal}
            handleSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

export default NewStreamItem;