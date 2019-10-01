import React, { useState } from 'react';
import { ipcRenderer } from 'electron';

// Constants

// Components
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Styles

export default function CustomChain({ props }) {
  const [chainName, setChainName] = useState('');

  const nameInput = (e) => {
    const name = e.target.value;
    setChainName(name)
  }

  const customChain = () => {
    if (!(chainName)) {
      alert('No name given');
      return;
    }
    ipcRenderer.send('chain:create-custom', chainName);
  };

  return (
    <React.Fragment>
      <Typography gutterBottom>
          Custom blockchains allow the admin to configure every detail of the blockchain.
          Once the chain has been created, the params.dat file will be opened in your
          default text editor. Configure parameters to fit your use-case BEFORE starting
          blockchain.
      </Typography>
      <br></br>
      <Input onChange={nameInput} placeholder="Chain name" />
      <br></br>
      <br></br>
      <Typography gutterBottom>
        <Button onClick={customChain} variant="outlined">Create</Button>
      </Typography>
    </React.Fragment>
  );
}
