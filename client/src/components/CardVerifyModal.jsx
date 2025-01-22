import { Modal } from 'semantic-ui-react';

import './CardVerifyModal.css'

function CardVerifyModal({ currentYear, cvv, setCvv, expMonth, setExpMonth, expYear, setExpYear, isOpen, onHandleClose, onHandleVerifyCard }) {
  const monthsArray = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const futureYear = currentYear + 10
  const yearsArray = []

  for (let i = 0; i <= 10; i++) {
    yearsArray.unshift(futureYear - i)
  }
  yearsArray.push('')

  const handleSetValue = (e) => {
    const { name, value } = e.target;
    if (name === 'exp-month') setExpMonth(value)
    if (name === 'exp-year') setExpYear(value)
    if (name === 'cvv') setCvv(value)
  }

  return (
    <Modal
      open={isOpen}
      onClose={onHandleClose}
    >
      <form className='card-verify-modal_form'>
        <div className="exp_container">
          <label htmlFor="exp-month">CC Expiration Month</label>
          <select
            value={expMonth}
            name='exp-month'
            onChange={handleSetValue}
          >
            {monthsArray.map(month => (
              <option
                key={month}
                value={month}
                className='month-option'
              >{month}</option>
            ))}
          </select>
        </div>
        <div className="exp_container">
          <label htmlFor="exp-year">CC Expiration Year</label>
          <select
            value={expYear}
            name='exp-year'
            onChange={handleSetValue}
          >
            {yearsArray.map(year => (
              <option
                key={year}
                value={year}
                name='exp-year'
                className='year-option'
              >{year}</option>
            ))}
          </select>
        </div>
        <div className="cvv_container">
          <label htmlFor="cvv">CVV</label>
          <input
            placeholder={'CVV'}
            value={cvv > 0 ? cvv : ''}
            onChange={handleSetValue}
            name='cvv'
            required
            className='card-verify-modal_input'
            minLength={3}
            maxLength={3}
          />
        </div>
        <button className='card-verify-modal_submit-button' onClick={e => {
          e.preventDefault()
          onHandleVerifyCard()
        }}>Submit</button>
      </form>
    </Modal>
  );
}

export default CardVerifyModal;