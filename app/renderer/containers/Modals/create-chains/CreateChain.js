import React, { useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Tabs from './CreateChainTabs';

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

  const { CreateChain } = props.state.modals;
  const { closeModal, feedback } = props.functions;

  const handleClose = () => {
    closeModal('CreateChain');
  };

  useEffect(() => {
    // Create Chains
    ipcRenderer.on('chain-create:success', (e, response) => {
      feedback('success', response);
    });
    ipcRenderer.on('chain-create:fail', (e, response) => {
      feedback('error', response);
    });
  }, [ipcRenderer])



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
            <Tabs />
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
