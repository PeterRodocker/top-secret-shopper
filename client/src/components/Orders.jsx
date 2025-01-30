import SingleOrder from './SingleOrder'

const Orders = ({ orders, showOrders, setShowOrders }) => {

  return (
    <div className='account-buttons_container'>
      {!showOrders &&
        <button
          className='account_buttons past-orders_button'
          onClick={() => setShowOrders(true)}
        >
          View Past Orders
        </button>}
      {orders.length > 0 && showOrders &&
        <div >
          {orders.reverse().map(order => (
            <SingleOrder key={order.id} order={order} />
          ))}
        </div>}
      {showOrders > 0 &&
        <button className='account_buttons past-orders_button hide-past-orders_button'
          onClick={() => setShowOrders(false)}
        >
          Hide Past Orders
        </button>}
    </div>
  )
}

export default Orders
