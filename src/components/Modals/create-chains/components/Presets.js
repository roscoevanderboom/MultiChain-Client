import React, { useState } from 'react';

// Components
import Button from '../../../CustomButtons/Button';
import {Input, Typography} from '@material-ui/core';

const Preset = ({ createChain }) => {
  const [chainName, setChainName] = useState(''); ;

  const nameInput = (e) => {
    const name = e.target.value;
    setChainName(name)
  }

  const presetChain = (e) => {
    e.preventDefault();
    if (!(chainName)) {
      alert('No name given');
      return;
    }
    createChain({ chainName, option: 'preset' });
  };

  return (
    <React.Fragment>
      <Typography gutterBottom>
        Preset chains have been configured to make setting up new blockchains quicker.
        **The name "New Chain" is not useable as a chain name.
      </Typography>
      <br></br>
      <form onSubmit={presetChain}>
        <Input onChange={nameInput} placeholder="Chain name" />
      </form>
      <br></br>
      <br></br>
      <Typography gutterBottom>
         <Button onClick={presetChain} size='sm' color="github">Create</Button>
      </Typography>
    </React.Fragment>
  );
}
export default Preset;