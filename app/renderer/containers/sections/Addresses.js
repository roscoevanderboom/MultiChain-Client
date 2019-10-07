// Services
import React, { useState, useEffect } from 'react';

// Actions
import listAddresses from '../../actions/Addresses';

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

// Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 1),
  },
  paper: {
    padding: theme.spacing(1, 1),
    cursor: 'pointer',
    border: 'solid black 1px',
    marginBottom: 10,
  },
  text: {
    width: '30%'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

export default ({ props }) => {
  const classes = useStyles();
  const [addressList, setAddressList] = useState([]);

  const { multichain, activeChain } = props.state;
  const { feedback } = props.functions;

  const list = () => {
    listAddresses(multichain, setAddressList)
  }

  const newAddress = () => {
    if (!(multichain)) {
      feedback('You are not connected', 'error');
      return;
    }
    multichain.getNewAddress()
    .then(res => {
      console.log(res);
      list();
    })
    .catch(err => console.log(err.message));
  }

  useEffect(() => {
    if (!activeChain) {
      setAddressList([]);
    }
  }, [activeChain])

  useEffect(() => {
    if (multichain) {
      list();
    }
  }, [multichain])

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" component="h3">
          Addresses:
        </Typography>
        <div>
          <Button onClick={newAddress} variant="outlined" >New Address</Button>
          <Multisig props={props} />
        </div>
      </Toolbar>


      <List className={classes.list}>
        {addressList.map(address =>
          <Paper className={classes.paper} key={address.address}>
            <ListItemText
              primary={address.address}
              secondary={`isMine: ${address.ismine}`} />
          </Paper>
        )}
      </List>

    </React.Fragment>
  );
}
