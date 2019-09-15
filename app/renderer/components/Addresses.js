// Services
import React from 'react';

// Constants

// Components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';

// Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

export default function Addresses({ props }) {

  const classes = useStyles();

  const { state } = props;
  const { addresses } = state;

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Addresses
      {addresses.map((address, i) =>
            <ListItemText key={i} primary={address} />
          )}
        </Typography>
      </Paper>
      <Divider />
    </React.Fragment>
  );
}
