import React, { useState }  from 'react';
import { remote } from 'electron';

// Constants
import Daemons from '../../constants/Daemons'

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
    Daemons.createChain(chainName)
      .then(() => {
        console.log('Success')
        remote.app.relaunch();
        remote.app.quit();
      })
      .catch((err) => {
        props.functions.feedback('error', err.message)
      })
  };


  return (
    <React.Fragment>
      <Typography gutterBottom>
        A generic chain will be created with default settings. This is a secure chain with most permissions
        set to false. Generic chains are useful for testing purposes. Custom chains are recommentded for
        production environmets.
      </Typography>
      <Input onChange={nameInput} placeholder="Chain name" />
      <br></br>
      <br></br>
      <Typography gutterBottom>
        <Button onClick={genericChain} variant="outlined">Create</Button>
      </Typography>
    </React.Fragment>
  );
}
