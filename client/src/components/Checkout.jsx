import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ShippingAddress from './ShippingAddress'
import Card from './Card';
import { closeCart, createNewCart, fetchCart } from '../utility/cartFuncs';
import { clearLocalStorage, getLocalStorage } from '../utility/localStorageFuncs';
import { addToOrder, closeOrder, createNewOrder } from '../utility/orderFuncs';

import './Checkout.css'

import CartContext from '../contexts/CartContext';
import UserContext from '../contexts/UserContext';
import BillingAddress from './BillingAddress';
import CheckoutCartItems from './CheckoutCartItems';
import CompleteOrderModal from './CompleteOrderModal';
import WarningModal from './WarningModal';

const Checkout = () => {
  const [user, setUser] = useContext(UserContext)
  const [cart, setCart] = useContext(CartContext)
  const [shippingAddress, setShippingAddress] = useState({})
  const [billingAddress, setBillingAddress] = useState({})
  const [checked, setChecked] = useState(true)
  const [selectedCard, setSelectedCard] = useState({})
  const [verifiedCard, setVerifiedCard] = useState({})
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [message, setMessage] = useState('')
  const [order, setOrder] = useState([])
  const [orderTotal, setOrderTotal] = useState(0)
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const token = window.localStorage.getItem('authorization')

  const navigate = useNavigate()

  const itemsToFetch = [
    ['checked', setChecked],
    ['shippingAddress', setShippingAddress],
    ['billingAddress', setBillingAddress],
    ['selectedCard', setSelectedCard],
    ['verifiedCard', setVerifiedCard]
  ]

  const itemsToClear = [
    ['billingAddress', {}, setBillingAddress],
    ['shippingAddress', {}, setShippingAddress],
    ['selectedCard', {}, setSelectedCard],
    ['verifiedCard', {}, setVerifiedCard],
    ['cart', [], setCart]
  ]

  useEffect(() => {
    if (checked && shippingAddress.id) {
      setBillingAddress(shippingAddress)
      return window.localStorage.setItem('billingAddress', JSON.stringify(shippingAddress))
    }
    if (checked && billingAddress.id) {
      setShippingAddress(billingAddress)
      window.localStorage.setItem('shippingAddress', JSON.stringify(billingAddress))
    }
    if (!checked && shippingAddress.id === billingAddress.id) {
      setBillingAddress({})
      window.localStorage.setItem('billingAddress', JSON.stringify({}))
    }
  }, [checked])

  useEffect(() => {
    if (shippingAddress.id === billingAddress.id) setChecked(true)
  }, [shippingAddress, billingAddress])

  useEffect(() => {
    itemsToFetch.forEach(item => getLocalStorage(item[0], item[1]))
  }, [])

  useEffect(() => {
    getTotal()
  }, [])


  const getTotal = () => {
    let subtotal = 0
    cart.forEach(cartItem => {
      subtotal += (cartItem.cartProduct.quantity * cartItem.price)
    })
    setOrderTotal(subtotal)
  }

  const handleCheck = (e) => {
    setChecked(e.target.checked)
    window.localStorage.setItem('checked', e.target.checked)
  }

  const handleCheckout = async (e, token, cart, shippingAddress, billingAddress, card, orderTotal) => {
    e.preventDefault()
    if (!shippingAddress.id || !billingAddress.id || !selectedCard.id) {
      if (!shippingAddress.id) setMessage('Please Select Your Shipping Address')
      else if (!billingAddress.id) setMessage('Please Select Your Billing Address')
      else if (!verifiedCard.id) setMessage('Please Select Your Payment Method')
      return setWarningModalOpen(true)
    }
    if (cart.length < 1) {
      setMessage('You Have No Items In Your Cart')
      return setWarningModalOpen(true)
    }
    await createNewOrder(token)
    const updatedOrder = await addToOrder(token, cart, shippingAddress, billingAddress, card, orderTotal)
    setOrder(updatedOrder)
    setCompleteModalOpen(true)
  }

  const handleCompleteClose = async () => {
    closeOrder(token)
    closeCart(token)
    await createNewCart(token)
    const newCart = await fetchCart(token)
    setCart(newCart)
    itemsToClear.forEach(item => clearLocalStorage(item[0], item[1], item[2]))
    setCompleteModalOpen(false)
    navigate('/products')
  }

  const handleWarningClose = () => {
    setWarningModalOpen(false)
  }

  return (
    <div className='checkout_container'>
      <h1>Checkout</h1>
      <div className="checkout_content">
        <div className="cart-item_container">
          <CheckoutCartItems cart={cart} />
          {orderTotal > 0 && <h2>Order Total: ${orderTotal} </h2>}
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
                selected={billingAddress.id && '-selected'}
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
          className='checkout_update-button checkout_button'
          onClick={() => navigate('/cart')}
        >Update Your Cart</button>
        <button
          className='checkout_complete-button checkout_button'
          onClick={(e) => handleCheckout(e, token, cart, shippingAddress, billingAddress, verifiedCard, orderTotal)}
        >Complete Your Order</button>
      </div>
      <WarningModal isOpen={warningModalOpen} onClose={handleWarningClose} message={message} />
      <CompleteOrderModal isOpen={completeModalOpen} onClose={handleCompleteClose} order={order} />
    </div>
  )
}

export default Checkout








