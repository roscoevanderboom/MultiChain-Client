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
  DialogActions,
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
  const [details, setDetails] = useState({});

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
  const handleDetails = (e) => {
    let data = {};
    let form = document.getElementById('streamDetails')
    let keys = form.querySelectorAll('p');
    let inputs = form.querySelectorAll('input');
    console.log(keys);
    console.log(inputs);

    inputs.forEach((input, index) => {
      data[keys[index]] = input.value
    });
    return JSON.stringify(data)
  }
  const handleSubmit = () => {
    let details = handleDetails();
    console.log(details);
    const options = { name, isOpen, details }

    // createStream(multichain, options)
    //   .then(() => {
    //     feedback('success', name + ' created');
    //     getStreamList()
    //   })
    //   .catch(err => {
    //     feedback('error', err.message)
    //   })
  }

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
            <OptionSwitch
              switchValue='read'
              checkedValue={restrictions.includes('read') ? true : false}
              handleClick={handleRestrictions('read')} />
            <OptionSwitch
              switchValue='write'
              checkedValue={restrictions.includes('write') ? true : false}
              handleClick={handleRestrictions('write')} />
            <OptionSwitch
              switchValue='onchain'
              checkedValue={restrictions.includes('onchain') ? true : false}
              handleClick={handleRestrictions('onchain')} />
            <OptionSwitch
              switchValue='offchain'
              checkedValue={restrictions.includes('offchain') ? true : false}
              handleClick={handleRestrictions('offchain')} />
          </div>
          <Divider />
          <Typography variant='h6'>Stream Details</Typography>
          <div id='streamDetails'>
            <DynamicForm feedback={feedback} />
          </div>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetails} color="primary">
            Create
          </Button>
          <Button onClick={handleModal} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
