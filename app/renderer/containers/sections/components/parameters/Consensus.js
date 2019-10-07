// Services
import React, { useState, useEffect } from 'react';

// Components
import {
  List,
  ListItemText,
  Typography
} from '@material-ui/core';

export default ({ props,classes }) => {

  const keys = [
    'admin-consensus-activate',
    'admin-consensus-admin',
    'admin-consensus-create',
    'admin-consensus-issue',
    'admin-consensus-mine',
    'admin-consensus-txfilter',
    'admin-consensus-upgrade',
  ]

  return (
    <React.Fragment>
      <Typography variant="h5" component="h3">
        Consensus:
      </Typography>
      <List className={classes.list}>
        {keys.map(key =>
          <ListItemText
            className={classes.text}
            key={key}
            primary={`${key}`}
            secondary={`${props[key]}`}/>
        )}
      </List>
    </React.Fragment>
  );
}
