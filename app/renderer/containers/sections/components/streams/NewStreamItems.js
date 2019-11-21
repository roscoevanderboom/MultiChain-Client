// Services
import React, { useState, useContext, useEffect } from 'react';

// State
import { GlobalState } from '../../../../state/state';

// Actions
import { publish } from '../../../../actions/Streams';

// Components
import {
  Button,
  Dialog,
  DialogContent,
  Input,
  MenuItem,
  Typography,
  TextField
} from '@material-ui/core';

import DynamicForm from '../../../components/DynamicForm';
import AddressSelect from '../../../sections/components/Addresses-Select';


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

export default ({ stream, updateAll }) => {
  const [open, setOpen] = useState(false);
  const [keys, setKeys] = useState([]);
  const [address, setAddress] = useState(false);

  const { state, methods } = useContext(GlobalState);
  const { multichain } = state;
  const { feedback } = methods;

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

  const handleSubmit = (json) => {
    multichain.publishFrom({
      from: address,
      stream: stream.name,
      key: keys,
      data: {
        json: json
      }
    })
      .then(res => {
        console.log(res)
        feedback('success', 'New item posted');
        updateAll()
      })
      .catch(err => {
        console.log(err)
        feedback('error', err.message)
      })
  }

  return (
    <React.Fragment>
      <Button
        variant='outlined'
        onClick={handleModal}
        children={'Add Items'} />

      <Dialog open={open} onClose={handleModal} aria-labelledby="form-dialog-title">
        <DialogContent>
          <Typography variant='h5' component='h5'>Publishing Address</Typography>
          <AddressSelect
            value={address}
            onChange={handleAddress} />
          <br></br>
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
                style={style.btn}
                variant='outlined'
                onClick={handleRemoveKey}
                children={key} />)}
          </div>
          <br></br>
          <Typography variant='h5' component='h5'>Item Details</Typography>
          <DynamicForm
            feedback={feedback}
            handleModal={handleModal}
            handleSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}
