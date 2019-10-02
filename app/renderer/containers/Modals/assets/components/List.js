// Services
import React, { useState, useEffect } from 'react';

// Components
import {
  ListItemText,
  List,
} from '@material-ui/core';

export default ({ props, classes }) => {

  console.log(props)


  return (
    <List className={classes.list}>
      <ListItemText
        className={classes.text}
        primary={`Issue quantity`}
        secondary={`${props.issueqty}`} />

      <ListItemText
        className={classes.text}
        primary={`Asset reference`}
        secondary={`${props.assetref}`} />

      <ListItemText
        className={classes.text}
        primary={`Asset units`}
        secondary={`${props.units}`} />

      <ListItemText
        className={classes.text}
        primary={`Asset multiple`}
        secondary={`${props.multiple}`} />

      <ListItemText
        className={classes.text}
        primary={`Restrict send`}
        secondary={`${props.restrict.send}`} />

      <ListItemText
        className={classes.text}
        primary={`Restrict receive`}
        secondary={`${props.restrict.receive}`} />
    </List>
  )
}


