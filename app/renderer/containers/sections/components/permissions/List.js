// Services
import React, { useState, useEffect } from 'react';

// Components
import { List } from '@material-ui/core';
import Collapse from '../../../components/Collapse-Array';


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
  const [permissionArrays, setPermissionArrays] = useState({
    admin: [],
    activate: [],
    connect: [],
    create: [],
    send: [],
    receive: [],
    issue: [],
    mine: []
  });

  const keys = [
    'admin',
    'activate',
    `connect`,
    'create',
    'send',
    'receive',
    'issue',
    'mine'
  ];

  const sort_by_permission = () => {
    let sortedArrays = {
      admin: [],
      activate: [],
      connect: [],
      create: [],
      send: [],
      receive: [],
      issue: [],
      mine: []
    }
    keys.map(key => {
      sortedArrays[key] = permissions.filter(val => val.type === key);
      sortedArrays[key] = sortedArrays[key].map(val => val.address)
    })
    setPermissionArrays(sortedArrays)
  }

  useEffect(() => {
    sort_by_permission()
  }, [permissions])

  return (permissions.length !== 0 &&
    <React.Fragment>
      <List className={classes.list}>
        {keys.map((key, i) =>
          <Collapse name={key.toUpperCase()} props={permissionArrays[key]} />
        )}
      </List>
    </React.Fragment>
  );
}
