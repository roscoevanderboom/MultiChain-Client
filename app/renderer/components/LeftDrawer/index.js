import React from 'react';
import { Link } from "react-router-dom";

import {
    Drawer, List, ListItem,
    ListItemText, Button
} from '@material-ui/core';

import FingerPrint from '@material-ui/icons/Fingerprint';

import useStyles from './styles';

export default function TemporaryDrawer() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(open);
    };

    const sections = [
        'dashboard', 'assets', 'streams', 'addresses',
        'peers', 'permissions', 'parameters', 'chainInfo'
    ]

    const firstToUppercase = (string) => {
        return string.replace(/^\w/, c => c.toUpperCase());
    }
    const ListItems = ({ title }) => {
        return (
            <Link to={`/home/${title}`}
                className={classes.listItemText}>
                <ListItem button>
                    <ListItemText>
                        {firstToUppercase(title)}
                    </ListItemText>
                </ListItem>
            </Link>
        )
    }

    return (
        <div>
            <Button
                onClick={toggleDrawer(true)}>
                <FingerPrint className={classes.appBarIcon} />
            </Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <div
                    className={classes.list}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}>
                        <br />
                        <br />
                    <List>
                        {sections.map((section, i) =>
                            <ListItems key={i}
                                title={section} />
                        )}
                    </List>
                </div>
            </Drawer>
        </div>
    );
}