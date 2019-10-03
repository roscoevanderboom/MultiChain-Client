// Services
import React, { useState, useEffect } from 'react';

// Actions
import listPermissions from '../../actions/Permissions';

// Components
import { Typography } from '@material-ui/core';
import List from './components/permissions/List';

// Modals

export default function Permissions({ props }) {

  const [permissions, setPermissions] = useState(false);

  const { multichain } = props.state;

  const list = () => {
    listPermissions(multichain, setPermissions)
  }

  useEffect(() => {
    if (multichain) {
      list()
    }
  }, [multichain])

  return (
    <React.Fragment>
      <Typography variant="h5" component="h3">
        Permissions:
      </Typography>
      <List props={permissions} />
    </React.Fragment>
  );
}
