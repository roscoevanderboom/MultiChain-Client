//
//
import React from 'react'

// Modals
import CreateChain from './create-chains/CreateChain';
import ConnectRemoteChain from './connect-remote-node/ConnectRemoteChain';

export default () => {
  return (
    <React.Fragment>
      <CreateChain />
      <ConnectRemoteChain />
    </React.Fragment>
  )
}
