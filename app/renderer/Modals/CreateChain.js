// Services
import React, { useState } from 'react';
import { remote } from 'electron';

// Constants
import Daemons from '../constants/Daemons'

// Styles and Components
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import CreateChainTabs from '../containers/CreateChainTabs'

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  createBtn: {
    padding: theme.spacing(2),
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export default function CustomizedDialogs({ props }) {

  const [chainName, setChainName] = useState('');
  const [params, setParams] = useState('');
  const [consensus, setConsensus] = useState('');

  const handleClose = () => {
    props.close('CreateChain');
  };

  const nameInput = (e) => {
    const name = e.target.value;
    setChainName(name)
  }

  const genericChain = () => {
    if (!(chainName)) {
      alert('No name given');
      return;
    }
    Daemons.createChain(chainName)
      .then(() => {
        console.log('Success')
        remote.app.relaunch();
        remote.app.quit();
      })
      .catch(() => {
        console.log('Fail ')
      })
  };

  const tabProps = {
    nameInput: nameInput,
    genericChain: genericChain
  }

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={props.state}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Create new blockchain
        </DialogTitle>

        <CreateChainTabs props={tabProps}/>
      </Dialog>
    </div>
  );
}
