import AddressFields from "./AddressFields";
import BillingAddress from "./BillingAddress";
import './ShippingAddress.css'

import SingleAddress from "./SingleAddress";

function ShippingAddress({
  user,
  checked,
  setChecked,
  shippingAddress,
  setShippingAddress,
  billingAddress,
  setBillingAddress
}) {

  const handleShippingSelect = (e) => {
    const tempShippingAddress = user.addresses.filter(a => a.id === parseInt(e.target.value))
    setShippingAddress(tempShippingAddress[0])
    window.localStorage.setItem('shippingAddress', JSON.stringify(tempShippingAddress[0]))

    if (!billingAddress.id) {
      setBillingAddress(tempShippingAddress[0])
      window.localStorage.setItem('billingAddress', JSON.stringify(tempShippingAddress[0]))
    }
  }

  const handleNewShipping = () => {
    setShippingAddress({})
    window.localStorage.setItem('shippingAddress', JSON.stringify({}))
    if (checked) setChecked(false)
  }

  return (
    <div className='shipping-address_container'>
      {shippingAddress.id ?
        <div className='address'>
          <AddressFields address={shippingAddress} />
          <div className="new-shipping_label-input">
            {shippingAddress.id ? <p className="new-shipping_label">Choose Different Shipping Address</p> : ''}
            <input
              name="new-shipping"
              type="radio"
              defaultChecked={false}
              className="new-shipping_input"
              onChange={handleNewShipping}
            />
          </div>
        </div>
        : user?.addresses?.map(address => (
          <SingleAddress
            address={address}
            handler={handleShippingSelect}
            key={address.id}
          />
        ))
      }
    </div>
  )
}

export default ShippingAddress
