import OrderAddressFields from './OrderAddressFields';
import ItemView from './ItemView';
import FormatDate from './FormatDate';

import './SingleOrder.css'

const SingleOrder = ({ order }) => {
  const shippingAddress = order.addresses.filter(a => a.orderAddress.type === 'both' || a.orderAddress.type === 'shipping')[0]

  return (
    <div className='single-order_container'>
      <div id='past-order-header'>
        <span><p>Order #{order?.id}</p></span>
        <span className='date'><p>{<FormatDate inputDate={order.createdAt} />}</p></span>
        <span ><p>{`Total - $${order?.total}`}</p></span>
      </div>
      <div className="shipped-to">
        <p id='ship-ad'>Shipped to:</p>
        <OrderAddressFields address={shippingAddress} />
      </div>
      <div className="order-items_container">
        {order.products.map(product => (
          <ItemView key={product.id} cartItem={product} />
        ))}
      </div>


    </div>
  )
}

export default SingleOrder
