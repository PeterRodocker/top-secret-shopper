import SingleOrder from './SingleOrder'

import { fetchOrders } from "../utility/orderFuncs"



const Orders = ({ orders, setOrders }) => {
  const token = window.localStorage.getItem('authorization')

  const handleSetPastOrders = async (token) => {
    const fetchedOrders = await fetchOrders(token)
    setOrders(fetchedOrders)
  }

  return (
    <div className='account-buttons_container'>
      {orders.length === 0 &&
        <button
          className='account_buttons past-orders_button'
          onClick={() => handleSetPastOrders(token)}
        >
          View Past Orders
        </button>}
      {orders.length > 0 &&
        <div >
          {orders.reverse().map(order => (
            <SingleOrder key={order.id} order={order} />
          ))}
        </div>}
      {orders.length > 0 &&
        <button className='account_buttons past-orders_button hide-past-orders_button'
          onClick={() => setOrders([])}
        >
          Hide Past Orders
        </button>}
    </div>
  )
}

export default Orders
