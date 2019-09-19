// Services
import React from 'react';

// Constants

// Components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

// Modals
import Multisig from '../Modals/MulticSigAddress'

// Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 1),
    marginBottom: 12,
    display: 'flex',
    justifyContent: 'space-between'
  },
  body: {
    padding: theme.spacing(3, 2),
    marginBottom: 12
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '50%'
  },
}));

export default function Addresses({ props }) {

  const classes = useStyles();

  const { state, functions } = props;
  const { addresses } = state;

  const newAddress = () => {
    state.multichain.getNewAddress((err, info) => {
      if (err) {
        console.log(err)
        return;
      }
     console.log(info);
     functions.getChainAddresses();
    });
  }

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Addresses
        </Typography>
        <Typography  className={classes.buttons}>
          <Button onClick={newAddress} variant="outlined" color="primary">New</Button>
          <Multisig />
          <Button variant="outlined" color="primary">Import</Button>
        </Typography>

      </Paper>
      <Divider />
      <Paper className={classes.body}>
        <Typography variant="h5" component="h3">
          {addresses.map((address, i) =>
            <ListItemText key={i} primary={address.address} secondary={`ismine: ${address.ismine}`}/>
          )}
        </Typography>
      </Paper>
    </React.Fragment>
  );
}
