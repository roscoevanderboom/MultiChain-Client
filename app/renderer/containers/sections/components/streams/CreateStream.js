import React, { useState, useContext } from 'react';

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
  Switch
} from '@material-ui/core';

import DynamicForm from '../../../components/DynamicForm'

const style = {
  options: {
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  switch: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}

export default ({ getStreamList }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [restrictions, setRestrictions] = useState([]);

  const { state, methods } = useContext(GlobalState);
  const { multichain } = state;
  const { feedback } = methods;

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
  const handleRestrictions = (option) => (e) => {
    if (restrictions.includes(option)) {
      let index = restrictions.indexOf(option)
      let remove = [...restrictions];
      remove.splice(index, 1);
      setRestrictions(remove);
      return;
    }
    let add = [...restrictions, option]
    setRestrictions(add);
  }
  const handleIsOpen = (e) => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  }

  const handleSubmit = (jsonData) => {
    const options = { name, isOpen, jsonData, restrictions }
    if (!name) {
      feedback('error', 'Please give a name')
      return;
    }

    createStream(multichain, options)
      .then(() => {
        feedback('success', name + ' created');
        getStreamList()
      })
      .catch(err => {
        feedback('error', err.message)
      })
  }

  const switchValues = [
    'read',
    'write',
    'onchain',
    'offchain',
  ]

  const OptionSwitch = ({ switchValue, checkedValue, handleClick }) => {
    return (
      <div style={style.switch}>
        <p>{switchValue}</p>
        <Switch
          value={switchValue}
          onClick={handleClick}
          color='primary'
          checked={checkedValue}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </div>
    )
  }


  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleModal}>
        New Stream
      </Button>
      <Dialog open={open} onClose={handleModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create stream</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here can be some tips for creating streams.
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
            <OptionSwitch
              switchValue='isOpen'
              checkedValue={isOpen}
              handleClick={handleIsOpen} />
            {switchValues.map(val =>
              <OptionSwitch
                switchValue={val}
                checkedValue={restrictions.includes({ val }) ? true : false}
                handleClick={handleRestrictions({ val })} />
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
