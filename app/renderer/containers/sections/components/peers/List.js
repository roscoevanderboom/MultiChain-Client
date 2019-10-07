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


export default ({ props }) => {
  const classes = useStyles();
  const [peerInfo, setPeerInfo] = useState([])

  useEffect(() => {
    setPeerInfo(props)
  }, [props])

  return (
    <React.Fragment>
      <List className={classes.list}>
        {peerInfo.map(peer =>
          <ListItemText
            key={peer.address}
            className={classes.text}
            primary={peer.address} />
        )}
      </List>
    </React.Fragment>
  );
}
