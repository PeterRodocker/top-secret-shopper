import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ShippingAddress from './ShippingAddress'
import Card from './Card';
import { addToOrder, closeOrder, createNewOrder } from '../utility/orderFuncs';

import './Checkout.css'

import CartContext from '../contexts/CartContext';
import UserContext from '../contexts/UserContext';
import BillingAddress from './BillingAddress';
import CheckoutCartItems from './CheckoutCartItems';
import CompleteOrderModal from './CompleteOrderModal';
import SelectModal from './SelectModal';

const Checkout = () => {
  const [user, setUser] = useContext(UserContext)
  const [selectedCard, setSelectedCard] = useState({})
  const [verifiedCard, setVerifiedCard] = useState({})
  const [cart, setCart] = useContext(CartContext)
  const [shippingAddress, setShippingAddress] = useState({})
  const [billingAddress, setBillingAddress] = useState({})
  const [checked, setChecked] = useState(true)
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [selectModalOpen, setSelectModalOpen] = useState(false);
  const [type, setType] = useState('')
  const token = window.localStorage.getItem('authorization')

  const navigate = useNavigate()
  let subtotal = 0

  useEffect(() => {
    if (checked && shippingAddress.id) {
      setBillingAddress(shippingAddress)
      return window.localStorage.setItem('billingAddress', JSON.stringify(shippingAddress))
    }
    if (checked && billingAddress.id) {
      setShippingAddress(billingAddress)
      window.localStorage.setItem('shippingAddress', JSON.stringify(billingAddress))
    }
  }, [checked])

  useEffect(() => {
    if (shippingAddress.id === billingAddress.id) setChecked(true)
  }, [shippingAddress, billingAddress])

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
    if (window.localStorage.getItem('selectedCard')) {
      const localCard = window.localStorage.getItem('selectedCard')
      setSelectedCard(JSON.parse(localCard))
    }
    if (window.localStorage.getItem('verifiedCard')) {
      const localCard = window.localStorage.getItem('verifiedCard')
      setVerifiedCard(JSON.parse(localCard))
    }
  }

  const handleCheck = (e) => {
    setChecked(e.target.checked)
    window.localStorage.setItem('checked', e.target.checked)
  }

  const handleCheckout = async (e, token, cart, shippingAddress, billingAddress, card, total) => {
    e.preventDefault()
    if (!shippingAddress.id) {
      setSelectModalOpen(true)
      return setType('Shipping Address')
    }
    if (!billingAddress.id) {
      setSelectModalOpen(true)
      return setType('Billing Address')
    }
    if (!verifiedCard.id) {
      setSelectModalOpen(true)
      return setType('Payment Method')
    }
    await createNewOrder(token)
    const updatedOrder = await addToOrder(token, cart, shippingAddress, billingAddress, card, total)
    setOrder(updatedOrder)
    setCompleteModalOpen(true)
  }

  const handleCompleteClose = async () => {
    // await closeOrder(token)
    // await createNewOrder(token)
    // setCompleteModalOpen(false)
    // navigate('/products')
  }

  const handleSelectClose = () => {
    setSelectModalOpen(false)
  }

  const getSubtotal = () => {
    cart?.map(cartItem => {
      subtotal += (cartItem.cartProduct.quantity * cartItem.price)
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
              shippingAddress.id && checked ?
                <h3>Shipping & Billing Address</h3> :
                shippingAddress.id ?
                  <h3>Shipping Address</h3> :
                  <h3>Select Shipping Address</h3>
          }
          <ShippingAddress
            user={user}
            checked={checked}
            setChecked={setChecked}
            shippingAddress={shippingAddress}
            setShippingAddress={setShippingAddress}
            billingAddress={billingAddress}
            setBillingAddress={setBillingAddress}
          />
          <div>
            <div className="same-as_container">
              {billingAddress.id && !shippingAddress.id ?
                <p className='same-as_label'>Shipping Address Same As Billing</p> :
                <p className='same-as_label'>Billing Address Same As Shipping</p>
              }
              <input
                type="checkbox"
                checked={checked}
                className="billing-select_input"
                value="billing"
                onChange={handleCheck}
              />
            </div>
          </div>
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
        <div className="card_container">
          {selectedCard.id ?
            <h3>Payment Method</h3> :
            <h3>Select Payment Method</h3>
          }
          <Card
            billingAddress={billingAddress}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
            user={user}
            verifiedCard={verifiedCard}
            setVerifiedCard={setVerifiedCard}
          />
        </div>
      </div>
      <div className='checkout_button-container'>
        <button
          className='checkout_update-button'
          onClick={() => navigate('/cart')}
        >Update Your Cart</button>
        <button
          className='checkout_complete-button'
          onClick={(e) => handleCheckout(e, token, cart, shippingAddress, billingAddress, verifiedCard, subtotal)}
        >Complete Your Order</button>
      </div>
      <SelectModal isOpen={selectModalOpen} onClose={handleSelectClose} type={type} />
      <CompleteOrderModal isOpen={completeModalOpen} onClose={handleCompleteClose} />
    </>
  )
}

export default Checkout








