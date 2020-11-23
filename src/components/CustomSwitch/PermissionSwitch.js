// Services
import React, { useState, useEffect, useContext } from 'react';
import { store } from '../../store';
// Constants
import { listAddresses, listPermissions } from '../../reducers/multichain';
import { revoke, grant } from '../../reducers/permissions';
// Components
import { Switch } from '@material-ui/core';

const CustomSwitch = ({ name, address }) => {
  const { state, reducers } = useContext(store);
  const [status, setStatus] = useState(false);
  const { multichain, permissions } = state.multichain_state;

  // eslint-disable
  useEffect(() => {
    permissions[name].includes(address.address)
      ? setStatus(true)
      : setStatus(false)
  })

  const togglePermission = () => {
    const props = { multichain, reducers, address, name, listAddresses, listPermissions }
    if (status) {
      revoke(props)
    } else if (!status) {
      grant(props)
    }
  };

  return (
    <Switch
      color='primary'
      onClick={togglePermission}
      checked={status}
      value={name} />
  )
}

export default CustomSwitch;