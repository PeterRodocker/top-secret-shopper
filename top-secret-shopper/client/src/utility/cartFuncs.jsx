import axios from 'axios'

export const fetchCart = async (userId, token) => {
  const { data: cart } = await axios.get('api/cart', {
    headers: { authorization: token },
    params: { userId }
  })
  return cart
}

export const createNewCart = async (userId, token) => {
  const { data: cart } = await axios.post('api/cart', {
    headers: { authorization: token },
    params: { userId }
  })
  return cart
}

export const updateCart = async (userId, productId, quantity, token) => {
  const { data: cart } = await axios.put('api/cart', {
    productId,
    quantity
  }, {
    headers: { authorization: token },
    params: { userId },
  })
  return cart
}

export const deleteFromCart = async (userId, productId, token) => {
  const { data: cart } = await axios.delete('api/cart', {
    headers: { authorization: token },
    params: { userId },
    data: { productId }
  })
  return cart
}