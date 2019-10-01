import React, { useState } from 'react';
import { ipcRenderer } from 'electron';

// Constants

// Components
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Styles

export default function PresetChain({ props }) {
  const [chainName, setChainName] = useState('');

  const nameInput = (e) => {
    const name = e.target.value;
    setChainName(name)
  }

  const presetChain = () => {
    if (!(chainName)) {
      alert('No name given');
      return;
    }
    ipcRenderer.send('chain:create-preset', chainName);
  };

  return (
    <React.Fragment>
      <Typography gutterBottom>
        Preset chains have been configured to make setting up new blockchains quicker.
      </Typography>
      <br></br>
      <Input onChange={nameInput} placeholder="Chain name" />
      <br></br>
      <br></br>
      <Typography gutterBottom>
        <Button onClick={presetChain} variant="outlined">Create</Button>
      </Typography>
    </React.Fragment>
  );
}
