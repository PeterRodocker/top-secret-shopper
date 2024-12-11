import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ShippingAddress from './ShippingAddress'
import Payments from './Payments';
import './Checkout.css'

import CartContext from '../contexts/CartContext';
import UserContext from '../contexts/UserContext';
import CheckoutCartItems from './CheckoutCartItems';
import BillingAddress from './BillingAddress';

const Checkout = () => {
  const [user, setUser] = useContext(UserContext)
  const [cart, setCart] = useContext(CartContext)
  const [shippingAddress, setShippingAddress] = useState({})
  const [billingAddress, setBillingAddress] = useState({})
  const [checked, setChecked] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState({})

  const navigate = useNavigate()

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
    if (window.localStorage.getItem('paymentMethod')) {
      const localPaymentMethod = window.localStorage.getItem('paymentMethod')
      setPaymentMethod(JSON.parse(localPaymentMethod))
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
      <div className="checkout_content">
        <div className="cart-item_container">
          <CheckoutCartItems cart={cart} />
          <h2>Order Total: ${getSubtotal()} </h2>
        </div>

        <div className="address_container">
          {
            user.addresses?.length === 1 ?
              <h3>Shipping & Billing Address</h3> :
              shippingAddress.street ?
                <h3>Shipping Address</h3> :
                <h3>Select Shipping Address</h3>
          }
          <ShippingAddress
            user={user}
            checked={checked}
            setChecked={setChecked}
            shippingAddress={shippingAddress}
            setShippingAddress={setShippingAddress} />
          {shippingAddress.id ?
            <div>
              <div className="same-as_container">
                <p className='same-as_label'>Billing Address Same As Shipping</p>
                <input
                  type="checkbox"
                  checked={checked}
                  className="billing-select_input"
                  value="billing"
                  onChange={handleCheck}
                />
              </div>
            </div>
            : ''}
          {checked ? "" :
            <>
              {billingAddress.id ?
                <h3>Billing Address</h3> :
                <h3>Select Billing Address</h3>
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




        <div className="payment_container">
          {paymentMethod.id ?
            <h3>Payment Method</h3> :
            <h3>Select Payment Method</h3>
          }
          <Payments
            user={user}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        </div>



      </div>
      <div className='checkout_button-container'>
        <button
          className='checkout_update-button'
          onClick={() => navigate('/cart')}
        >Update Your Cart</button>
        <button className='checkout_complete-button'>Complete Your Order</button>
      </div>
    </>
  )
}

export default Checkout








