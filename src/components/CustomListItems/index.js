import React from 'react';

import {
    Typography, ListItem, ListItemText, ListItemIcon
} from '@material-ui/core';

export const Item = (props) => {
    const { text, data } = props;
    return (
        <ListItem>
            <ListItemText>
                {text}
            </ListItemText>
            <ListItemIcon>
                <Typography>
                    {data}
                </Typography>
            </ListItemIcon>
        </ListItem>
    )
}