import './PaymentFields.css'

function PaymentFields({ pm, selected }) {
  return (
    <div className={`payment-fields payment-fields${selected}`}>
      <div className="payment-row">
        <p className="payment-field_label">Payment Type:</p>
        <p className='payment-field' >{pm.type}</p>
      </div>
      <div className="payment-row">
        <p className="payment-field_label">Name:</p>
        <p className='payment-field' >{pm.name}</p>
      </div>
      <div className="payment-row">
        <p className="payment-field_label">Number:</p>
        <p className='payment-field' >{pm.number}</p>
      </div>
      {pm.nickname ?
        <div className="payment-row">
          <p className="payment-field_label">Nickname:</p>
          <p className='payment-field' >{pm.nickname}</p>
        </div> : ''}
    </div>
  )
}



export default PaymentFields
