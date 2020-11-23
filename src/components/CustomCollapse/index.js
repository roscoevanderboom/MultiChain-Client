// Services
import React, { useState } from 'react';
// Components
import {
    Collapse,
    ListItem,
    ListItemText,
    ListItemIcon,
    IconButton,
    Grid,
    makeStyles
} from '@material-ui/core';
// Icons
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const styles = makeStyles({
    grid: {
        display: 'flex'
    },
    text: {
        display: 'flex',
        alignItems: 'center'
    },
    listItemOpen: {
        backgroundColor: 'lightgrey'
    },
    icon: {
        padding: 0
    }
})

const CustomCollapse = (props) => {
    const {
        listitemchildren, title
    } = props;
    const [open, setOpen] = useState(false);
    const classes = styles();
    const handleClick = () => {
        open ? setOpen(false) : setOpen(true);
    };

    return (
        <React.Fragment>
            <ListItem
                button
                {...props}
                onClick={handleClick}
                className={open ? classes.listItemOpen : ''} >
                <Grid container>

                    <Grid item xs={4}
                        className={classes.grid}>
                        <ListItemText
                            primary={title}
                            className={classes.text} />
                    </Grid>

                    <Grid item xs={7}>
                        {listitemchildren}
                    </Grid>

                    <Grid item xs={1}>
                        <ListItemIcon>
                            <IconButton className={classes.icon}>
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </IconButton>
                        </ListItemIcon>
                    </Grid>

                </Grid>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {props.children}
            </Collapse>
        </React.Fragment>
    )
}

export default CustomCollapse;