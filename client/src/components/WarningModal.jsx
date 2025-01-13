import { Modal } from 'semantic-ui-react';

import './WarningModal.css'

function WarningModal({ isOpen, onClose, message }) {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <p className='warning_message'>{message}</p>
    </Modal>
  );
}

export default WarningModal;