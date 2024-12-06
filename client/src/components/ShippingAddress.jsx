import { useContext, useEffect, useState } from "react"
import AddressFields from "./AddressFields";
import './ShippingAddress.css'

import SingleAddress from "./SingleAddress";

function ShippingAddress({
  user,
  shippingAddress,
  setShippingAddress,
  billingAddress,
  setBillingAddress
}) {

  const handleShippingSelect = (e) => {
    const tempShippingAddress = user.addresses.filter(a => a.id === parseInt(e.target.value))
    setShippingAddress(prevState => ({ ...prevState, ...tempShippingAddress[0] }))
  }

  return (
    <div className='shipping-address__container'>
      {shippingAddress.street ?
        <div className='address'>
          <AddressFields address={shippingAddress} />
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
