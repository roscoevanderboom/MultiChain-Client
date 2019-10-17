import React, { useContext } from 'react';
// State
import { GlobalState } from '../../../state/state';

// Components
import { Modal, Backdrop, Fade } from '@material-ui/core';
import Tabs from './CreateChainTabs';

import { makeStyles } from '@material-ui/core/styles';
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

export default () => {
  const classes = useStyles();
  const { state, methods } = useContext(GlobalState);
  const { CreateChain } = state.modals;
  const { closeModal, feedback } = methods;

  const handleClose = () => {
    closeModal('CreateChain');
  };

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={CreateChain}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={CreateChain}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Create Chain</h2>
            <Tabs feedback={feedback} />
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
