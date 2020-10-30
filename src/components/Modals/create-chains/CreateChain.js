import React, { useContext } from 'react';
// State
import { store } from '../../../store';

// Components
import Tabs from './CreateChainTabs';
import Modal from '../Modal';

const CreateChain = () => {
  const { state, reducers } = useContext(store);
  const { CreateChain } = state.modals;
  const { handleModals } = reducers;

  const handleClose = () => {
    handleModals('CreateChain', false);
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
export default CreateChain;