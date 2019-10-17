import React, { useState } from 'react';

// Components
import {Input, Button, Typography} from '@material-ui/core';

export default ({ createChain }) => {
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
      </Typography>
      <br></br>
      <form onSubmit={presetChain}>
        <Input onChange={nameInput} placeholder="Chain name" />
      </form>
      <br></br>
      <br></br>
      <Typography gutterBottom>
        <Button onClick={presetChain} variant="outlined">Create</Button>
      </Typography>
    </React.Fragment>
  );
}
