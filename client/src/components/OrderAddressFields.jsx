import './OrderAddressFields.css'

function OrderAddressFields({ address }) {
  return (
    <div className='order-address-fields_container'>
      <p>{`${address.street} `}</p>
      {address.unit ? <p className='address-field' >{`Unit ${address.unit} `}</p> : ''}
      <p id='city' className='address-field' >{` ${address.city}, ${address.state} ${address.zip}`}</p>
    </div>
  )
}

export default OrderAddressFields
