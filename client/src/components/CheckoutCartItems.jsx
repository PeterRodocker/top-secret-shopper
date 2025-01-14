import CheckoutItemView from './CheckoutItemView'
import './CheckoutCartItems.css'

function CheckoutCartItems({ cart }) {

  return (
    <div className="checkout_cart-items">
      <div className='checkout_items-container'>
        <h3>Cart Items</h3>
        {cart.length ? cart.map(cartItem => (
          <CheckoutItemView
            cartItem={cartItem}
            key={cartItem.id}
          />)) :
          <h3 className='no-items'>No items in your cart</h3>}
      </div>
    </div>
  )
}

export default CheckoutCartItems
