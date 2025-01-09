import axios from 'axios'

export const fetchCart = async (token) => {
  const { data: cart } = await axios.get('api/cart', {
    headers: { authorization: token }
  })
  return cart
}

export const createNewCart = async (token) => {
  const { data: cart } = await axios.post('api/cart', {}, {
    headers: { authorization: token }
  })
  return cart
}

export const addToCart = async (productId, quantity, token) => {
  const { data: cart } = await axios.put('api/cart', {
    productId,
    quantity
  }, {
    headers: { authorization: token }
  })
  return cart
}

export const updateCart = async (productId, quantity, token) => {
  const { data: cart } = await axios.put('api/cart/update', {
    productId,
    quantity
  }, {
    headers: { authorization: token }
  })
  return cart
}

export const deleteFromCart = async (productId, token) => {
  const { data: cart } = await axios.delete('api/cart', {
    headers: { authorization: token },
    data: { productId }
  })
  return cart
}

export const closeCart = async (token) => {
  const { data: cart } = await axios.put('api/cart/close', {
  }, {
    headers: { authorization: token }
  })
  return cart
}