//
import React from 'react';

// Components
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ChainList from './ChainList';
import Divider from '@material-ui/core/Divider';

// Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  drawer: {
    width: 250,
    marginTop: 20
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginLeft: 15,
    marginRight: 15,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  active: {
    border: '2px solid green',
    borderRadius: '8px'
  },
  stopBtn: {
    justifyContent: 'flex-end'
  },
});


export default (side, toggleDrawer, props) => {
  const classes = useStyles();

  const { openModal } = props.functions;

  return (
    <div
      className={classes.drawer}
      role="presentation"
      onKeyDown={toggleDrawer(side, false)} >
      <Typography variant="h6" className={classes.header}>
        Local chains
      </Typography>
      <Divider />
      <div className={classes.header}>
        <Button key={'create'} variant="outlined"
          onClick={() => {
            openModal('CreateChain')
          }}>Create</Button>
        <br />
        <Button key={'connect'} variant="outlined"
          onClick={() => {
            openModal('ConnectRemoteChain')
          }}>Connect</Button></div>
      <Divider />
      <ChainList props={props} classes={classes} />
    </div>
  )
};

// <ChainList props={props} />
