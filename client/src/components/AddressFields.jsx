import './AddressFields.css'

function AddressFields({ address, selector }) {
  return (
    <div className={`address-fields address-fields${selector}`}>
      <p className='address-field' >{address.street}</p>
      {address.unit ? <p className='address-field' >{`Unit ${address.unit}`}</p> : ''}
      <p className='address-field' >{address.city}</p>
      <p className='address-field' >{address.state}</p>
      <p className='address-field' >{address.zip}</p>
    </div>
  )
}

export default AddressFields
