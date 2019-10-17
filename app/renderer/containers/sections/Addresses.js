// Services
import React, { useState, useEffect, useContext } from 'react';

// State
import { GlobalState } from '../../state/state';

// Actions
import { listAddresses, getNewAddress } from '../../actions/Addresses';

// Components
import {
  Typography,
  List,
  ListItemText,
  Toolbar,
  Button,
  Paper
} from '@material-ui/core';

// Modals
import Multisig from '../Modals/addresses/MulticSigAddress'

const style = {
  addressCard: {
    padding: 12,
    width: '50%',
    cursor: 'pointer',
    border: 'solid black 1px',
    marginBottom: 10,
  }
}

export default ({ classes }) => {
  const { state, methods } = useContext(GlobalState);
  const { multichain, activeChain, addresses } = state;
  const { feedback, setAddresses } = methods;

  const newAddress = () => {
    getNewAddress(multichain)
      .then(res => getAddresses())
      .catch(err => feedback('error', err))
  }
  const getAddresses = () => {
    listAddresses(multichain)
      .then(res => setAddresses(res))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (!multichain) {
      setAddresses([]);
      return;
    }
    getAddresses()
  }, [multichain])

  return (multichain &&
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" component="h3">
          Addresses:
        </Typography>
        <div>
          <Button onClick={newAddress} variant="outlined" >New Address</Button>
          <Multisig />
        </div>
      </Toolbar>


      <List >
        {addresses.map(address =>
          <Paper style={style.addressCard} key={address.address}>
            <ListItemText
              primary={address.address}
              secondary={`isMine: ${address.ismine}`} />
          </Paper>
        )}
      </List>

    </React.Fragment>
  );
}
