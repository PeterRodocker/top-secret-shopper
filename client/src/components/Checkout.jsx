import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ShippingAddress from './ShippingAddress'
import Payment from './Payment';
import './Checkout.css'

import CartContext from '../contexts/CartContext';
import UserContext from '../contexts/UserContext';
import CheckoutCartItems from './CheckoutCartItems';
import BillingAddress from './BillingAddress';

const Checkout = () => {
  const [user, setUser] = useContext(UserContext)
  const [cart, setCart] = useContext(CartContext)
  // const [shippingAddress, setShippingAddress] = useContext(shippingAddressContext)
  // const [billingAddress, setBillingAddress] = useContext(billingAddressContext)
  // const [checked, setChecked] = useContext(checkedContext)



  const [shippingAddress, setShippingAddress] = useState({})
  const [billingAddress, setBillingAddress] = useState({})
  const [checked, setChecked] = useState(true)

  const navigate = useNavigate()

  console.log('shippingAddress', shippingAddress)
  console.log('billingAddress', billingAddress)



  useEffect(() => {
    if (checked && billingAddress.id) setBillingAddress({})
  }, [checked])


  useEffect(() => {
    getLocalStorage()
  }, [])

  const getLocalStorage = () => {
    if (window.localStorage.getItem('checked')) {
      const localChecked = window.localStorage.getItem('checked')
      setChecked(JSON.parse(localChecked))
    }
    if (window.localStorage.getItem('shippingAddress')) {
      const localShipping = window.localStorage.getItem('shippingAddress')
      setShippingAddress(JSON.parse(localShipping))
    }
    if (window.localStorage.getItem('billingAddress')) {
      const localBilling = window.localStorage.getItem('billingAddress')
      setBillingAddress(JSON.parse(localBilling))
    }
  }

  const handleCheck = (e) => {
    setChecked(prevState => e.target.checked)
    window.localStorage.setItem('checked', e.target.checked)
    if (checked && billingAddress.id) setBillingAddress({})
  }

  const getSubtotal = () => {
    let subtotal = 0
    cart?.map(cartItem => {
      subtotal += (cartItem.cartDetail.quantity * cartItem.price)
    })
    return subtotal
  }

  return (
    <>
      <h1>Checkout</h1>
      <div className="checkout__content">
        <CheckoutCartItems cart={cart} />
        <div className="addresses-payment__container">
          {
            user.addresses?.length === 1 ?
              <h3>Shipping & Billing Address</h3> :
              shippingAddress.street ?
                <h3>Shipping Address</h3> :
                <h3>Select Shipping Address</h3>
          }
          <ShippingAddress
            user={user}
            shippingAddress={shippingAddress}
            setShippingAddress={setShippingAddress}
            billingAddress={billingAddress}
            setBillingAddress={setBillingAddress}
          />
          {shippingAddress.street ?
            <div>
              <div className="same-as_container">
                <p className='same-as_label'>Billing Address Same As Shipping</p>
                <input
                  name="billing-select_input"
                  type="checkbox"
                  checked={checked}
                  className="billing-select"
                  value="billing"
                  onChange={handleCheck}
                />
              </div>
              {checked ? "" :
                <>
                  {checked ? "" :
                    !billingAddress.id ?
                      <h3>Select Billing Address</h3> :
                      <h3>Billing Address</h3>
                  }
                  <BillingAddress
                    user={user}
                    billingAddress={billingAddress}
                    setBillingAddress={setBillingAddress}
                    shippingAddress={shippingAddress}
                    checked={checked}
                    setChecked={setChecked}
                  />
                </>
              }

            </div>
            : ''}
          <Payment />
        </div>
      </div>


      <div className='checkout__subtotal-div'>
        <h2>Order Total: ${getSubtotal()} </h2>
        <button
          className='checkout__update-button'
          onClick={() => navigate('/cart')}
        >Update Your Cart</button>
        <button className='checkout__complete-button'>Complete Your Order</button>
      </div>
    </>
  )
}

export default Checkout








