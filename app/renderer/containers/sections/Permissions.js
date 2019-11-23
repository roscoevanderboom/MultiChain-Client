// Services
import React, { useEffect, useContext } from 'react';

// State
import { GlobalState } from '../../state/state';

// Components
import List from './components/permissions/List';

export default () => {
  const { state } = useContext(GlobalState);
  const { permissions } = state;

  return (permissions &&
    <List permissions={permissions} />
  );
}
