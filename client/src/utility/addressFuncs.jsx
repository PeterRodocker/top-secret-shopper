import axios from 'axios'

export const createNewAddress = async (token, newAddress) => {
  const { firstName, lastName, street, unit, city, state, zip } = newAddress

  const { data: address } = await axios.post('api/address',
    { firstName, lastName, street, unit, city, state, zip }, {
    headers: { authorization: token },
  })
  return address
}

export const deleteAddress = async (token, addressId) => {
  const { data: address } = await axios.delete(`api/address/${addressId}`, {
    params: { id: addressId },
    headers: { authorization: token },
  })
  return address
}