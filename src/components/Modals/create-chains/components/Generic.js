import React, { useState } from 'react';

// Components
import {Input, Button, Typography} from '@material-ui/core';

const Generic = ({ createChain }) => {
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
    createChain({ chainName, option: 'generic' })
  };


  return (
    <React.Fragment>
      <Typography gutterBottom>
        A generic chain will be created with default settings. This is a secure chain with most permissions
        set to false. Generic chains are useful for testing purposes. Custom chains are recommentded for
        production environmets. **The name "New Chain" is not useable as a chain name.
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
export default Generic;