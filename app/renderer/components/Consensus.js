// Services
import React from 'react';

// Constants
import consensus from '../constants/Consensus';

// Components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

// Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

export default function ChainParams({ props }) {

  const classes = useStyles();

  const { state } = props;
  const { chainParams } = state;

  const keys = Object.keys(consensus)

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Consensus:
      <List>
            {keys.map(con =>
              <ListItemText key={con} primary={chainParams ? `admin-${con}: ` + chainParams[`admin-${con}`] : `admin-${con}: `} />
            )}
          </List>
        </Typography>
      </Paper>
      <Divider />
    </React.Fragment>
  );
}
