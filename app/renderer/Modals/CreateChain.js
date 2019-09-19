// Services
import React, { useState } from 'react';

// Components
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import CreateChainTabs from '../containers/CreateChainTabs'

// Styles
import { withStyles } from '@material-ui/core/styles';

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

export default function CreateChainModal({ props }) {

  const handleClose = () => {
    props.functions.close('CreateChain');
  };

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={props.state}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Create new blockchain
        </DialogTitle>
        <CreateChainTabs props={props} />
      </Dialog>
    </div>
  );
}
