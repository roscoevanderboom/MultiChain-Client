import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: 600
  },
}));

export default function CreateChain({ props }) {
  const classes = useStyles();

  const { ConnectRemoteChain } = props.state.modals;
  const { closeModal } = props.functions;

  const handleClose = () => {
    closeModal('ConnectRemoteChain');
  };

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={ConnectRemoteChain}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={ConnectRemoteChain}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Connect Remote Chain</h2>
            <p id="transition-modal-description">Tabs go here</p>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
