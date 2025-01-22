import AddressFields from "./AddressFields";
import SingleAddress from "./SingleAddress";
import './BillingAddress.css'


function BillingAddress({
  user,
  shippingAddress,
  billingAddress,
  setBillingAddress,
  selected
}) {

  const handleBillingSelect = (e) => {
    const tempBillingAddress = user.addresses.filter(a => a.id === parseInt(e.target.value))
    setBillingAddress(prevState => ({ ...prevState, ...tempBillingAddress[0] }))
    window.localStorage.setItem('billingAddress', JSON.stringify(tempBillingAddress[0]))
  }

  const handleNewBilling = () => {
    setBillingAddress({})
    window.localStorage.setItem('billingAddress', JSON.stringify({}))
  }

  return (
    <div className="billing-address_container">
      {billingAddress.street && billingAddress !== shippingAddress ?
        <div className='address'>
          <AddressFields address={billingAddress} />
          <div className={`new-billing_button-container new-billing_button-container${selected}`}>
            <button
              className="new-billing_button"
              onClick={handleNewBilling}
            >
              Choose Different Address
            </button>

          </div>
        </div>
        : user?.addresses?.filter(address => address.id !== shippingAddress.id).map(address => (
          <SingleAddress
            address={address}
            addressType="billing"
            checked={false}
            handler={handleBillingSelect}
            key={address.id}
          />
        ))
      }
    </div>
  )
}

export default BillingAddress
