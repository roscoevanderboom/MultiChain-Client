// Services
import React from 'react';

// Constants

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

export default function ChainInfo({ props }) {

  const classes = useStyles();

  const { state } = props;
  const { chainInfo } = state;

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Chain Details:
          <List>
            <ListItemText primary={chainInfo ? 'Nodeaddress: ' + chainInfo.nodeaddress : 'Nodeaddress: '} />
            <ListItemText primary={chainInfo ? 'Version: ' + chainInfo.version : 'Version: '} />
            <ListItemText primary={chainInfo ? 'Blocks: ' + chainInfo.blocks : 'Blocks: '} />
            <ListItemText primary={chainInfo ? 'Protocolversion: ' + chainInfo.protocolversion : 'Protocolversion: '} />
            <ListItemText primary={chainInfo ? 'Setupblocks: ' + chainInfo.setupblocks : 'Setupblocks: '} />
          </List>
        </Typography>
      </Paper>
      <Divider />
    </React.Fragment>
  );
}
