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

export default function Assets({ props }) {

  const classes = useStyles();

  const { state } = props;
  const { assets } = state;

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Assets
      {assets.map((stream, i) =>
            <ListItemText key={i} primary={stream.name} />
          )}
        </Typography>
      </Paper>
      <Divider />
    </React.Fragment>
  );
}
