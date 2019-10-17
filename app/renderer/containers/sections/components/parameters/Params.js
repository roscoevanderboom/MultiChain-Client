// Services
import React from 'react';

// Components
import {
  List,
  ListItemText,
  Typography
} from '@material-ui/core';

export default ({ params,classes }) => {

  const keys = [
    'anyone-can-activate',
    'anyone-can-admin',
    'anyone-can-connect',
    'anyone-can-create',
    'anyone-can-issue',
    'anyone-can-mine',
    'anyone-can-send',
    'anyone-can-receive',
    'anyone-can-receive-empty',
  ]

  return (
    <React.Fragment>
      <Typography variant="h5" component="h3">
        Main Params:
      </Typography>
      <List className={classes.list}>
        {keys.map(key =>
          <ListItemText
            className={classes.text}
            key={key}
            primary={`${key}`}
            secondary={`${params[key]}`}/>
        )}
      </List>
    </React.Fragment>
  );
}
