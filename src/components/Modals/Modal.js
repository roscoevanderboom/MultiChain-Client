import React from 'react';

// Components
import {
  Modal,
  Backdrop,
  Fade,
} from '@material-ui/core';

// Styles
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

const CustomModal = ({ name, body, closeModal }, props) => {
  const classes = useStyles();

  const handleClose = () => {
    closeModal();
  };

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        onClose={handleClose}
        open={name}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>

        <Fade in={name}>
          <div className={classes.paper}>
            {body}
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}

export default CustomModal;