// Services
import React, { useState, useEffect } from 'react';

// Components
import { List, ListItemText } from '@material-ui/core';


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


export default function PeerList({ props }) {
  const classes = useStyles();
  const [peerInfo, setPeerInfo] = useState([])

  if (props.length > 0) {
    console.log(props)
  }
  console.log(props)

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
            primary={peer.address}/>
        )}
      </List>
    </React.Fragment>
  );
}
