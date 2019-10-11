// Services
import React, { useState, useEffect } from 'react';

// Components
import {
  ListItemText,
  List,
} from '@material-ui/core';

export default ({ asset, classes }) => {

  console.log(asset)


  return (
    <List className={classes.list}>
      <ListItemText
        className={classes.text}
        primary={`Issue quantity`}
        secondary={`${asset.issueqty}`} />

      <ListItemText
        className={classes.text}
        primary={`Asset reference`}
        secondary={`${asset.assetref}`} />

      <ListItemText
        className={classes.text}
        primary={`Asset units`}
        secondary={`${asset.units}`} />

      <ListItemText
        className={classes.text}
        primary={`Asset multiple`}
        secondary={`${asset.multiple}`} />

      <ListItemText
        className={classes.text}
        primary={`Restrict send`}
        secondary={`${asset.restrict.send}`} />

      <ListItemText
        className={classes.text}
        primary={`Restrict receive`}
        secondary={`${asset.restrict.receive}`} />
    </List>
  )
}


