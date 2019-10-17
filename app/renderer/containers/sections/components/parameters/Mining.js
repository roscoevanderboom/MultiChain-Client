// Services
import React from 'react';

// Components
import {
  List,
  ListItemText,
  Typography
} from '@material-ui/core';


export default ({ params, classes }) => {

  const keys = [
    'mine-empty-rounds',
    'mining-diversity',
    'mining-requires-peers',
    'mining-turnover',
    'support-miner-precheck'
  ]

  return (
    <React.Fragment>
      <Typography variant="h5" component="h3">
        Mining:
      </Typography>
      <List className={classes.list}>
        {keys.map(key =>
          <ListItemText
            className={classes.text}
            key={key}
            primary={`${key}`}
            secondary={`${params[key]}`} />
        )}
      </List>
    </React.Fragment>
  );
}
