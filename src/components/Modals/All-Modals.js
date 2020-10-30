//
//
import React from 'react'

// Modals
import CreateChain from './create-chains/CreateChain';
import ConnectRemoteChain from './connect-remote-node/ConnectRemoteChain';

const AllModals = () => {
  return (
    <React.Fragment>
      <CreateChain />
      <ConnectRemoteChain />
    </React.Fragment>
  )
}
export default AllModals;