//
//
import React from 'react'

// Modals
import CreateChain from './create-chains/CreateChain';
import ConnectRemoteChain from './connect-remote-node/ConnectRemoteChain';
import Installer from './insaller/Installer';

export default () => {
  return(
    <React.Fragment>
        <CreateChain />
        <ConnectRemoteChain />
        <Installer />
      </React.Fragment>
  )
}
