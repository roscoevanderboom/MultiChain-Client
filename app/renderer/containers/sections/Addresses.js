// Services
import React, { useEffect, useContext } from 'react';

// State
import { GlobalState } from '../../state/state';

// Components
import {
  Typography,
  List,
  Toolbar,
  Button,
} from '@material-ui/core';

import AddressCollapse from './components/addresses/Address-Collapse';

// Modals
import Multisig from './components/addresses/MultiSigAddress'


export default ({ classes }) => {
  const globalState = useContext(GlobalState);
  const { state, methods } = globalState;
  const { multichain, addresses } = state;
  const { update } = methods;

  const getNewAddress = () => {
    multichain.getNewAddress()
      .then((res) => {
        update('addresses');
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (addresses &&
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" component="h3">
          Addresses:
        </Typography>
        <div>
          <Button onClick={getNewAddress} variant="outlined" >New Address</Button>

        </div>
      </Toolbar>
      <List >
        {addresses.map(address =>
          <AddressCollapse globalState={globalState} address={address} />
        )}
      </List>

    </React.Fragment>
  );
}
