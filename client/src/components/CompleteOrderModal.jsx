import { Modal } from 'semantic-ui-react';

import './CompleteOrderModal.css'

function CompleteOrderModal({ isOpen, onClose, order }) {
  return (
    <div>
      <Modal open={isOpen} onClose={onClose}>
        <div className="complete-content">
          <Modal.Header><h3>{`Your Order (#${order.id}) Will Be Shipped To:`}</h3></Modal.Header>
          <Modal.Content className='content'>
            {order?.addresses?.filter(a => ['shipping', 'both'].includes(a.orderAddress.type))
              .map(a => (
                <div key={a.id} className='shipping-address'>
                  <p id='field'>{a.street}</p>
                  <p >{`${a.city}, ${a.state} ${a.zip}`}</p>
                </div>
              ))
            }
            <p className='total'>{`Your Total Is $${order.total}`}</p>
            <h4 className='total'>{'Thank You For Shopping With Us'}</h4>
          </Modal.Content>
        </div>
      </Modal>
    </div>
  );
}

export default CompleteOrderModal;