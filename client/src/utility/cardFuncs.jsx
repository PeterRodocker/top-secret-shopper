import axios from 'axios'

export const fetchCard = async (token) => {
  const { data: card } = await axios.get('api/card', {
    headers: { authorization: token }
  })
  return card
}

export const fetchAndVerifyCard = async (token, cvv, exp, userId) => {
  const { data: card } = await axios.post('api/card/verify', {
    cvv,
    exp,
    userId
  },
    {
      headers: { authorization: token }
    })
  return card
}

// export const createNewOrder = async (token) => {
//   const { data: order } = await axios.post('api/order', {}, { headers: { authorization: token } })
//   return order
// }

// export const addToOrder = async (token, cart, shippingAddress, billingAddress, card, total) => {
//   const { data: order } = await axios.put('api/order', {
//     cart,
//     shippingAddress,
//     billingAddress,
//     card,
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