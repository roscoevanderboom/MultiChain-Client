// Services
import React, { useState, useEffect } from 'react';

// Components
import { Typography, List, ListItemText } from '@material-ui/core';


// Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 1),
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  text: {
    width: '47%'
  }
}));


export default ({ permissions }) => {
  const classes = useStyles();

  const keys = [
    'Admin:',
    'Activate:',
    `Connect:`,
    'Create:',
    'Send:',
    'Receive:',
    'Issue:',
    'Mine'
  ];
  const values = [1, 2, 3, 7, 4, 5, 6, 0];

  return (permissions.length !== 0 &&
    <React.Fragment>
      <List className={classes.list}>
        {keys.map((key, i) =>
          <ListItemText
            key={key}
            className={classes.text}
            primary={key}
            secondary={permissions ? permissions[values[i]].address : ''} />
        )}
      </List>
    </React.Fragment>
  );
}
