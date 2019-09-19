import React, { useState } from 'react';
import { remote } from 'electron';

// Constants
import Daemons from '../../constants/Daemons'

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

  const restart = () => {
    remote.app.relaunch();
    remote.app.quit()
  }

  const presetChain = () => {
    if (!(chainName)) {
      alert('No name given');
      return;
    }
    alert('Preset blockchains coming soon!')
    // Daemons.createChain(chainName)
    //   .then(() => {
    //     console.log('Success')
    //     remote.app.relaunch();
    //     remote.app.quit();
    //   })
    //   .catch((err) => {
    //     props.functions.feedback('error', err.message)
    //   })
  };

  return (
    <React.Fragment>
      <Typography gutterBottom>
        Preset chains have been configured to make setting up new blockchains quicker.
      </Typography>
      <Input onChange={nameInput} placeholder="Chain name" />
      <br></br>
      <br></br>
      <Typography gutterBottom>
        <Button onClick={presetChain} variant="outlined">Create</Button>
        <br></br>
        <br></br>
        <Button onClick={restart} variant="outlined">restart</Button>
      </Typography>
    </React.Fragment>
  );
}
