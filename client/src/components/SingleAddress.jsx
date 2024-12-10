import AddressFields from "./AddressFields"
import "./SingleAddress.css"

function SingleAddress({ address, handler }) {

  return (
    <div className='address' key={address.id}>
      <div className="address-input_container">
        <input
          id="address_input"
          type="radio"
          defaultChecked={false}
          value={address.id}
          onClick={handler}
        />
      </div>
      <AddressFields address={address} />
    </div>
  )
}

export default SingleAddress
