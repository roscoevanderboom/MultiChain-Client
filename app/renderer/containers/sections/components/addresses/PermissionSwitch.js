// Services
import React, { useState, useEffect } from 'react';
// Components
import {
  Switch
} from '@material-ui/core';

export default ({ name, address, globalState }) => {
  const [status, setStatus] = useState(false);
  const { multichain, permissions } = globalState.state;
  const { update, feedback } = globalState.methods;

  useEffect(() => {
    permissions[name].includes(address.address)
      ? setStatus(true)
      : setStatus(false)
  }, [permissions])

  const togglePermission = () => {
    if (status) {
      multichain.revoke({ addresses: address.address, permissions: name },
        (err, res) => {
          if (err) {
            feedback('error', err.message);
            console.log(err);
            return;
          }
          update('permissions')
          update('addresses')
        })
      return;
    }
    multichain.grant({ addresses: address.address, permissions: name },
      (err, res) => {
        if (err) {
          feedback('error', err.message);
          console.log(err);
          return;
        }
        update('permissions')
        update('addresses')
      })
  };

  return (
    <Switch
      color='primary'
      onClick={togglePermission}
      checked={status}
      value={name} />
  )
}
