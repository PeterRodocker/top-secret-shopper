import { Modal } from 'semantic-ui-react';

function SelectModal({ isOpen, onClose, type }) {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Modal.Header>{`Please Select Your ${type}`}</Modal.Header>
    </Modal>
  );
}

export default SelectModal;