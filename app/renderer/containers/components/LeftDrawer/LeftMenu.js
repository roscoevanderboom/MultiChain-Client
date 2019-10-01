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
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  fullList: {
    width: 'auto',
  },
  active: {
    border: '2px solid green',
    borderRadius: '8px'
  },
  stopBtn: {
    justifyContent: 'flex-end'
  }
});


const leftMenu = (side, toggleDrawer, props) => {
  const classes = useStyles();

  const { openModal } = props.functions;

  return (
    <div
      className={classes.drawer}
      role="presentation"
      onKeyDown={toggleDrawer(side, false)} >
      <br></br>
      <Typography variant="h6" className={classes.list}>
        Local chains
        <Button key={'create'} variant="outlined"
          onClick={() => {
            openModal('CreateChain')
          }}>Create</Button>

          <Button key={'connect'} variant="outlined"
          onClick={() => {
            openModal('ConnectRemoteChain')
          }}>Connect</Button>
      </Typography>
      <Divider />
      <ChainList props={props} />
    </div>
  )
};

export default leftMenu;
