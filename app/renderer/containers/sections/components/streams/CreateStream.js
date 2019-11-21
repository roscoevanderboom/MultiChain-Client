import React, { useState, useContext, useEffect } from 'react';

// State
import { GlobalState } from '../../../../state/state';

// Actions
import { createStream } from '../../../../actions/Streams';

// Components
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography,
} from '@material-ui/core';

import DynamicForm from '../../../components/DynamicForm'
import Switch from '../../../components/Labeled_Switch';

const style = {
  options: {
    display: 'flex',
    justifyContent: 'space-evenly'
  }
}

export default () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(false);
  const [restrict, setRestrict] = useState({
    read: false,
    write: false,
    onchain: false,
    offchain: false,
  })

  const { state, methods } = useContext(GlobalState);
  const { multichain, activeChain } = state;
  const { feedback, update } = methods;

  const handleModal = () => {
    if (!(multichain)) {
      feedback('error', 'You are not connected');
      return;
    }
    open ? setOpen(false) : setOpen(true);
  }
  const handleName = (e) => {
    setName(e.target.value);
  }
  const handleRestrictions = (e) => {
    setRestrict({
      ...restrict,
      [e.target.value]: restrict[e.target.value] ? false : true,
    })
  }

  const handleSubmit = (jsonData) => {
    const options = { name, jsonData, restrict }
    if (!name) {
      feedback('error', 'Please give a name')
      return;
    }

    createStream(activeChain, options)
      .then(() => {
        feedback('success', name + ' created');
        update('streams')
      })
      .catch(err => {
        feedback('error', err.slice(err.indexOf('message:') + 8))
      })
  }

  useEffect(() => {
    if (restrict.read) {
      setRestrict({
        ...restrict,
        onchain: true,
      })
    }
  }, [restrict.read])

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleModal}>
        New Stream
      </Button>
      <Dialog open={open} onClose={handleModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create stream</DialogTitle>
        <DialogContent>
          <DialogContentText>
            IMPORTANT: Streams created with 'read' restrictions do not allow for onchain
            data. They are also only readable with Multichain Entrprise Edition.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            id="Name"
            onChange={handleName}
            fullWidth />
          <br></br>
          <br></br>
          <Typography variant='h6'>Stream Options</Typography>
          <div style={style.options}>
            {Object.keys(restrict).map(val =>
              <Switch
                switchValue={val}
                checkedValue={restrict[val]}
                handleClick={handleRestrictions} />
            )}
          </div>
          <Divider />
          <Typography variant='h6'>Stream Details</Typography>
          <DynamicForm
            feedback={feedback}
            handleModal={handleModal}
            handleSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
