import React, { useState, useContext } from 'react';
import { store } from '../../store'

import {
    Drawer, Button, Container
} from '@material-ui/core';

import ChainList from './ChainList';
import CustomButtom from '../CustomButtons/Button';

import LinkIcon from '@material-ui/icons/Link';

import useStyles from './styles';

const RightDrawer = () => {
    const { reducers } = useContext(store);
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const toggleDrawer = (open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(open);
    };

    return (
        <div>
            <Button
                onClick={toggleDrawer(true)}>
                <LinkIcon className={classes.appBarIcon} />
            </Button>
            <Drawer open={open} anchor='right'
                onClose={toggleDrawer(false)}>
                <div
                    className={classes.list}
                    role="presentation">
                    <Container className={classes.buttonContainer}>
                        <CustomButtom color='info'
                            onClick={() => reducers.handleModals('CreateChain')}>
                            New Chain
                        </CustomButtom>
                        <CustomButtom color='danger'
                        onClick={() => reducers.handleModals('ConnectRemote')}>
                            Connect Remote
                        </CustomButtom>
                    </Container>
                    <br />

                    <ChainList />
                </div>
            </Drawer>
        </div>
    );
}

export default RightDrawer;