import AddressFields from "./AddressFields"
import "./SingleAddress.css"

function SingleAddress({ address, handler }) {
  return (
    <div className='address' key={address.id}>
      <div className="address-input_container">
        <button
          id="address_button"
          value={address.id}
          onClick={handler}
        >
          Choose This Address
        </button>
      </div>
      <AddressFields address={address} />
    </div>
  )
}

export default SingleAddress
