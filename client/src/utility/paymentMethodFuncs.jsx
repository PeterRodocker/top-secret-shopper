import axios from 'axios'

export const fetchPaymentMethod = async (token) => {
  const { data: paymentMethod } = await axios.get('api/paymentMethod', {
    headers: { authorization: token }
  })
  return paymentMethod
}

// export const createNewOrder = async (token) => {
//   const { data: order } = await axios.post('api/order', {}, { headers: { authorization: token } })
//   return order
// }

// export const addToOrder = async (token, cart, shippingAddress, billingAddress, paymentMethod, total) => {
//   const { data: order } = await axios.put('api/order', {
//     cart,
//     shippingAddress,
//     billingAddress,
//     paymentMethod,
//     total
//   }, {
//     headers: { authorization: token }
//   })
//   return order
// }

// export const closeOrder = async (token) => {
//   const { data: order } = await axios.put('api/order/close', {
//     isOpen: false
//   }, {
//     headers: { authorization: token }
//   })
//   return order
// }

// export const deleteFromOrder = async (productId, token) => {
//   const { data: order } = await axios.delete('api/order', {
//     headers: { authorization: token },
//     data: { productId }
//   })
//   return order
// }