import axios from 'axios'

export const fetchUser = async (token) => {
  const { data: user } = await axios.get('/auth/me', {
    headers: { authorization: token }
  })
  return user
}