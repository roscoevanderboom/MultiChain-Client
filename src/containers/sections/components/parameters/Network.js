// Services
import React, { useState, useEffect } from 'react';

// Components
import {
  List,
  ListItemText,
  Typography
} from '@material-ui/core';

export default ({ props, classes }) => {

  const keys = [
    'default-network-port',
    'default-rpc-port',
  ]

  return (
    <React.Fragment>
      <Typography variant="h5" component="h3">
        Network:
      </Typography>
      <List className={classes.list}>
        {keys.map(key =>
          <ListItemText
            className={classes.text}
            key={key}
            primary={`${key}`}
            secondary={`${props[key]}`} />
        )}
      </List>
    </React.Fragment>
  );
}
