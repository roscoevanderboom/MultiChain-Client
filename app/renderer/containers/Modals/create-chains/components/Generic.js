import React, { useState } from 'react';
import { ipcRenderer } from 'electron';

// Components
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function GenericChain({ props }) {
  const [chainName, setChainName] = useState('');

  const nameInput = (e) => {
    const name = e.target.value;
    setChainName(name)
  }
  const genericChain = () => {
    if (!(chainName)) {
      alert('No name given');
      return;
    }
    ipcRenderer.send('chain:create-generic', chainName);
  };


  return (
    <React.Fragment>
      <Typography gutterBottom>
        A generic chain will be created with default settings. This is a secure chain with most permissions
        set to false. Generic chains are useful for testing purposes. Custom chains are recommentded for
        production environmets.
      </Typography>
      <br></br>
      <Input onChange={nameInput} placeholder="Chain name" />
      <br></br>
      <br></br>
      <Typography gutterBottom>
        <Button onClick={genericChain} variant="outlined">Create</Button>
      </Typography>
    </React.Fragment>
  );
}
