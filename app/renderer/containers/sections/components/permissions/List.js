// Services
import React, { useState, useEffect } from 'react';

// Components
import { List } from '@material-ui/core';
import Collapse from '../../../components/Collapse-Array';

// Constants
import { address_permissions } from '../../../../constants/Permissions';


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

  return (
    <React.Fragment>
      <List className={classes.list}>
        {address_permissions.map((key, i) =>
          <Collapse name={key.toUpperCase()} props={permissions[key]} />
        )}
      </List>
    </React.Fragment>
  );
}
