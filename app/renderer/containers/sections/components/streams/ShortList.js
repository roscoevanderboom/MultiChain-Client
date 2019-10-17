// Services
import React, { useState, useEffect } from 'react';

// Components
import {
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core';


export default (stream, style) => {
  const [detailKeys, setDetailKeys] = useState([]);
  const [detailsValues, setDetailsValues] = useState([]);

  useEffect(() => {
    setDetailKeys(Object.keys(stream.details));
    setDetailsValues(Object.values(stream.details));
  }, [stream]);

  return (
    <React.Fragment>
      <ListItem>
        <ListItemText
          primary="Createtxid"
          secondary={`${stream.createtxid}`} />
      </ListItem>
      <div style={style.flex1}>
        <ListItem>
          <ListItemText
            primary="Streamref"
            secondary={`${stream.streamref}`} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Restrict - Read"
            secondary={`${stream.restrict.read}`} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Restrict - Write"
            secondary={`${stream.restrict.write}`} />
        </ListItem>
      </div>
      <Typography color="textPrimary">
        Details:
      </Typography>
      {detailKeys.map((key, i) =>
        <ListItem key={key}>
          <ListItemText
            primary={`${key}`}
            secondary={`${detailsValues[i]}`} />
        </ListItem>
      )}
    </React.Fragment>
  )
}
