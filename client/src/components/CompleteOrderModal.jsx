import { Modal } from 'semantic-ui-react';

function CompleteOrderModal({ isOpen, onClose }) {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Modal.Header>Profile Picture</Modal.Header>
      <Modal.Content>
        <p>We've auto-chosen a profile image for you.</p>
        <p>We've grabbed the following image from the <a href="https://www.gravatar.com" target="_blank">gravatar</a> image associated with your registered e-mail address.</p>
        <p>Is it okay to use this photo?</p>
      </Modal.Content>
      <Modal.Actions>
        <div className="ui negative button">
          Nope
        </div>
        <div className="ui positive right labeled icon button">
          Yep, that's me
          <i className="checkmark icon"></i>
        </div>
      </Modal.Actions>
    </Modal>
  );
}

export default CompleteOrderModal;