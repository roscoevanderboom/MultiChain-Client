// Services
import React, { useState, useContext } from 'react';
// State
import { store } from '../../../store';
// Constants
import { publishItems } from '../../../reducers/streams';
// Components
import {
  Dialog,
  DialogContent,
  Input,
  Typography,
  Switch
} from '@material-ui/core';
// Custom components
import CustomForm from '../../../components/CustomForm';
import AddressSelect from '../../../components/CustomSelect/Addresses-Select';
import Button from '../../../components/CustomButtons/Button';


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

const NewStreamItem = ({ stream }) => {
  const [open, setOpen] = useState(false);
  const [keys, setKeys] = useState([]);
  const [address, setAddress] = useState('');
  const [offchain, setOffchain] = useState(false)

  const { state, reducers } = useContext(store);
  const { multichain } = state.multichain_state;

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
    publishItems({ multichain, stream, address, keys, json, offchain, reducers })
  }

  return (
    <React.Fragment>
      <Button
        size='sm'
        variant='outlined'
        color='warning'
        onClick={handleModal}
        children={'Publish'} />

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
                size='sm'
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