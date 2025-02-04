import ItemView from './ItemView'
import './CheckoutCartItems.css'

function CheckoutCartItems({ cartItems }) {
  return (
    <div className="checkout_cart-items">
      <div className='checkout_items-container'>
        <h3>Cart Items</h3>
        {cartItems?.length ? cartItems.map(cartItem => (
          <ItemView
            cartItem={cartItem}
            key={cartItem.id}
          />)) :
          <h3 className='no-items'>No items in your cart</h3>}
      </div>
    </div>
  )
}

export default CheckoutCartItems
