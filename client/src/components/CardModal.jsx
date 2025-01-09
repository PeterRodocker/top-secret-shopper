import { Modal } from 'semantic-ui-react';

import './CardModal.css'

function CvvModal({ cvv, setCvv, exp, setExp, isOpen, onHandleClose, onHandleVerifyCard }) {

  const handleSetValue = (e) => {
    const { name, value } = e.target;
    if (name === 'cvv') setCvv(value)
    if (name === 'exp') setExp(value)
  }

  return (
    <Modal
      open={isOpen}
      onClose={onHandleClose}
    >
      <form className='card-modal_form'>
        <input
          placeholder={'Enter the Correct 4 Digit Expiration Date'}
          value={exp.length > 0 ? exp : ''}
          onChange={handleSetValue}
          name='exp'
          required
          className='card-modal_input'
          maxLength={4}
        />
        <input
          placeholder={'Enter the Correct CVV (The 3-digit # from the back of your card)'}
          value={cvv > 0 ? cvv : ''}
          onChange={handleSetValue}
          name='cvv'
          required
          className='card-modal_input'
          maxLength={4}
        />
        <button className='card-modal_submit-button' onClick={e => {
          e.preventDefault()
          onHandleVerifyCard()
        }}>Submit</button>
      </form>
    </Modal>
  );
}

export default CvvModal;