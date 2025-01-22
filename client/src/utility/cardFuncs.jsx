import axios from 'axios'

export const createNewCard = async (token, newCard) => {
  console.log('createNewCard before', newCard)
  const { name, type, number, exp, cvv, nickname } = newCard

  const { data: card } = await axios.post('api/card',
    { name, type, number, exp, cvv, nickname }, {
    headers: { authorization: token },
  })
  console.log('createNewCard after', card)
  return card
}

export const fetchCard = async (token) => {
  const { data: card } = await axios.get('api/card', {
    headers: { authorization: token }
  })
  return card
}


export const fetchAndVerifyCard = async (token, cvv, expMonth, expYear) => {
  console.log('**func cvv', cvv)
  console.log('**func expMonth', expMonth)
  console.log('**func expYear', expYear)
  const { data: card } = await axios.post('api/card/verify', {
    cvv,
    expMonth,
    expYear
  },
    {
      headers: { authorization: token }
    })
  return card
}

export const deleteCard = async (token, cardId) => {
  const { data: card } = await axios.delete(`api/card/${cardId}`, {
    params: { id: cardId },
    headers: { authorization: token },
  })
  return card
}

