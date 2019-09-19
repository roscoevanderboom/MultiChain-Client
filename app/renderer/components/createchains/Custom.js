import React, { useState } from 'react';
import { remote, shell } from 'electron';
import path from 'path';

// Constants
import Daemons from '../../constants/Daemons'
import Chainpaths from '../../constants/Chainpaths'

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

  const restart = () => {
    remote.app.relaunch();
    remote.app.quit()
  }

  const customChain = () => {
    if (!(chainName)) {
      alert('No name given');
      return;
    }
    Daemons.createChain(chainName)
      .then(() => {
        shell.openItem(path.join(Chainpaths, chainName, 'params.dat'))
      })
      .catch((err) => {
        props.functions.feedback('error', err.message)
      })
  };

  return (
    <React.Fragment>
      <Typography gutterBottom>
          Custom blockchains allow the admin to configure every detail of the blockchain.
          Once the chain has been created, the params.dat file will be opened in your
          default text editor. Configure parameters to fit your use-case, click RESTART.
      </Typography>
      <Input onChange={nameInput} placeholder="Chain name" />
      <br></br>
      <br></br>
      <Typography gutterBottom>
        <Button onClick={customChain} variant="outlined">Create</Button>
        <br></br>
        <br></br>
        <Button onClick={restart} variant="outlined">restart</Button>
      </Typography>
    </React.Fragment>
  );
}
