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
    'genesis-hash',
    'genesis-nbits',
    'genesis-nonce',
    'genesis-pubkey',
    'genesis-pubkey-hash',
    'genesis-timestamp',
    'genesis-version',
    'initial-block-reward',
    'setup-first-blocks'
  ]

  return (
    <React.Fragment>
      <Typography variant="h5" component="h3">
        Genesis:
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
