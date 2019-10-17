// Services
import React, { useState, useEffect } from 'react';

// Components
import { List, ListItemText } from '@material-ui/core';


// Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  list: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  text: {
    width: '47%'
  }
}));


export default ({ peers }) => {
  const classes = useStyles();

  console.log(peers)

  return (peers.length !== 0 &&
    <React.Fragment>
      <List className={classes.list}>
        {peers.map(peer =>
          <ListItemText
            key={peer.address}
            className={classes.text}
            primary={peer.address} />
        )}
      </List>
    </React.Fragment>
  );
}
