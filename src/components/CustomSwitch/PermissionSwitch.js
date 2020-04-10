// Services
import React, { useState, useEffect, useContext } from 'react';
import { store } from '../../store';
// Components
import { Switch } from '@material-ui/core';

export default ({ name, address }) => {
  const { state, reducers } = useContext(store);
  const [status, setStatus] = useState(false);
  const { multichain, permissions } = state;
  const { getChainData, feedback } = reducers;

  useEffect(() => {
    permissions[name].includes(address.address)
      ? setStatus(true)
      : setStatus(false)
      //eslint-disable-next-line
  })

  const togglePermission = () => {
    if (status) {
      multichain.revoke({ addresses: address.address, permissions: name },
        (err, res) => {
          if (err) {
            feedback('error', err.message);
            console.log(err);
            return;
          }
          getChainData('permissions')
          getChainData('addresses')
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
        getChainData('permissions')
        getChainData('addresses')
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
