import React from 'react';

// Components
import Button from '../CustomButtons/Button';
import {
    Modal,
    Backdrop,
    Fade
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

const ButtonModal = React.forwardRef((props, ref) => {
    const classes = useStyles();

    return (
        <div>
            <Button color="github" size='sm' onClick={props.onClose}>
                {props.title}
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                onClose={props.onClose}
                open={props.open}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>

                <Fade in={props.open}>
                    <div className={classes.paper}>
                        {props.children}
                    </div>
                </Fade>
            </Modal>
        </div>
    )
})

export default ButtonModal;