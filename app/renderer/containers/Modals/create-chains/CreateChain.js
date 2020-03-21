import React, { useContext } from 'react';
// State
import { GlobalState } from '../../../state';

// Components
import Tabs from './CreateChainTabs';
import Modal from '../Modal';

export default () => {
  const { state, methods } = useContext(GlobalState);
  const { CreateChain } = state.modals;
  const { closeModal } = methods;

  const handleClose = () => {
    closeModal('CreateChain');
  };

  return (
    <Modal
      name={CreateChain}
      closeModal={handleClose}
      body={
        <React.Fragment>
          <h2 id="transition-modal-title">Create Chain</h2>
          <Tabs />
        </React.Fragment>
      }
    />
  );
}
