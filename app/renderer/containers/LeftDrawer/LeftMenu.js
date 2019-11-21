//
import React, { useContext } from 'react';

// State
import { GlobalState } from '../../state/state';

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


export default (side, toggleDrawer) => {
  const classes = useStyles();

  const { methods } = useContext(GlobalState);
  const { openModal } = methods;

  return (
    <div
      className={classes.drawer}
      role="presentation"
      onKeyDown={toggleDrawer(side, false)} >
      <Typography variant="h6" className={classes.header}>
        Local chains
      </Typography>
      <Divider />
      <br />
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
      <ChainList />
    </div>
  )
};
