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
  Typography,
} from '@material-ui/core';

import DynamicForm from '../../../components/DynamicForm'

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

export default ({ stream, getStreamItemsList }) => {
  const [open, setOpen] = useState(false);
  const [keys, setKeys] = useState([]);

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

  const handleSubmit = (json) => {
    publish(multichain, stream, keys, json)
      .then(res => {
        console.log(res)
        feedback('success', 'New item posted');
        getStreamItemsList(stream)
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
