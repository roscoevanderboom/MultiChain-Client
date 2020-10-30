import React, { useState, useContext, useEffect } from 'react';

// State
import { store } from '../../../store';

// Actions
import { createStream } from '../../../actions/Streams';

// Components
import {
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography,
} from '@material-ui/core';
import Button from '../../../components/CustomButtons/Button';
import CustomForm from '../../../components/CustomForm'
import Switch from '../../../components/CustomSwitch';

const style = {
  options: {
    display: 'flex',
    justifyContent: 'space-evenly'
  }
}

const CreateSteam =() => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(false);
  const [restrict, setRestrict] = useState({
    read: false,
    write: false,
    onchain: false,
    offchain: false,
  })

  const { state, reducers } = useContext(store);
  const { multichain, localPaths, chainInfo } = state;
  const { feedback, getChainData } = reducers;

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
    createStream(chainInfo.chainname, options, localPaths.binariesPath)
      .then(() => { getChainData('streams') })
      .catch(err => { feedback('error', err) })
  }

  useEffect(() => {
    if (restrict.read) {
      setRestrict({
        ...restrict,
        onchain: true,
      })
    }
    // eslint-disable-next-line
  }, [restrict.read])

  return (
    <React.Fragment>
      <Button color="github" onClick={handleModal}>
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
            {Object.keys(restrict).map((val, i) =>
              <Switch
                key={i}
                switchValue={val}
                checkedValue={restrict[val]}
                handleClick={handleRestrictions} />
            )}
          </div>
          <Divider />
          <Typography variant='h6'>Stream Details</Typography>
          <CustomForm
            feedback={feedback}
            handleModal={handleModal}
            handleSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default CreateSteam;