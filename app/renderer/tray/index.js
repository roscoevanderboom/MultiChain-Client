import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
// materialui components
import {
  Button, Typography, Container, TextField
} from '@material-ui/core'

const Tray = () => {
  const [message, setMessage] = useState('');
  const handleMessage = () => {
    ipcRenderer.send('tray:message', message)
  }
  const handletext = (e) => {
    setMessage(e.target.value);
  }

  return (
    <Container>     
      <br />
      <Typography
        align='center'
        variant='h5'>
        Welcome to the Tray
      </Typography>
      <br />
      <TextField
        type='text'
        fullWidth
        onChange={handletext}>
      </TextField>
      <br />
      <br />
      <Button
        variant='outlined'
        color='success'
        onClick={handleMessage}>
        Send a message to main window via ipc.
      </Button>
      <br />
      <br />
      <Typography
        align='center'
        variant='body1'>
        The message will be received in the "Home" container.
      </Typography>
    </Container>
  )
}

export default Tray;