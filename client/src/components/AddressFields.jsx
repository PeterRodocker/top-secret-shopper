import './AddressFields.css'

function AddressFields({ address }) {
  return (
    <div className='address-fields'>
      <p className='address-field' >{address.street}</p>
      {address.unit ? <p className='address-field' >{`Unit ${address.unit}`}</p> : ''}
      <p className='address-field' >{address.city}</p>
      <p className='address-field' >{address.state}</p>
      <p className='address-field' >{address.zip}</p>
    </div>
  )
}

export default AddressFields
