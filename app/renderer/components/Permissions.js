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

export default function Permissions({ props }) {

  const classes = useStyles();

  const { state, functions } = props;


  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Permissions
        </Typography>
        <Typography className={classes.buttons}>
          Actions
        </Typography>

      </Paper>
      <Divider />
      <Paper className={classes.body}>
        <Typography variant="h5" component="h3">
          details
        </Typography>
      </Paper>
    </React.Fragment>
  );
}
