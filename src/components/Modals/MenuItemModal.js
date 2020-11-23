import React, { useState } from 'react';

// Components
import {
    Modal,
    Backdrop,
    Fade,
    MenuItem
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

const MenuItemModal = React.forwardRef((props, ref) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(open ? false : true)
    };

    return (
        <div>
            <MenuItem onClick={handleClose}>{props.title}</MenuItem>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                onClose={handleClose}
                open={open}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>

                <Fade in={open}>
                    <div className={classes.paper}>
                        {props.children}
                    </div>
                </Fade>
            </Modal>
        </div>
    )
})

export default MenuItemModal;