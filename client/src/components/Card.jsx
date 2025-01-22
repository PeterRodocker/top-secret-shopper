import { useEffect, useState } from 'react';

import CardVerifyModal from './CardVerifyModal';
import SingleCard from './SingleCard'
import './Card.css'

import { fetchAndVerifyCard } from '../utility/cardFuncs';
import { getLocalStorage } from '../utility/localStorageFuncs';


function Card({ selectedCard, setSelectedCard, user, verifiedCard, setVerifiedCard }) {
  const [cvv, setCvv] = useState(0)
  const [expMonth, setExpMonth] = useState('')
  const [expYear, setExpYear] = useState(0)
  const [cardModalOpen, setCardModalOpen] = useState(false)

  const token = window.localStorage.getItem('authorization')

  useEffect(() => {
    getLocalStorage('selectedCard', setSelectedCard)
  }, [])

  useEffect(() => {
    if (!selectedCard.id) {
      setVerifiedCard({})
      window.localStorage.setItem('verifiedCard', JSON.stringify({}))
    }
  }, [selectedCard])

  const handleCardSelect = async (e) => {
    const tempCard = user.cards.filter(card => card.id === parseInt(e.target.value))
    setSelectedCard(tempCard[0])
    window.localStorage.setItem('selectedCard', JSON.stringify(tempCard[0]))
    setCardModalOpen(true)
  }

  const handleVerifyCard = async () => {
    const verifiedCard = await fetchAndVerifyCard(token, cvv, expMonth, expYear, user.id)

    if (verifiedCard) {
      setVerifiedCard(verifiedCard)
      window.localStorage.setItem('verifiedCard', JSON.stringify(verifiedCard))

      setCardModalOpen(false)
    }
    setCvv(0)
    setExpMonth('')
    setExpYear(0)
  }

  const handleModalClose = async (e) => {
    if (!verifiedCard.id) {
      setSelectedCard({})
      window.localStorage.setItem('selectedCard', JSON.stringify({}))
    }
    setCardModalOpen(false)
  }

  const handleNewCard = () => {
    setSelectedCard({})
    window.localStorage.setItem('selectedCard', JSON.stringify({}))
  }

  return (
    <div className='card_container'>
      {selectedCard.id ?
        < SingleCard
          card={selectedCard}
          onHandleNewCard={handleNewCard}
          handler={handleCardSelect}
          selected={true}
          key={selectedCard.id}
        />
        :
        user?.cards?.map(card => (
          < SingleCard
            card={card}
            onHandleCardSelect={handleCardSelect}
            key={card.id}
          />
        ))
      }
      {cardModalOpen && <CardVerifyModal
        cvv={cvv}
        setCvv={setCvv}
        expMonth={expMonth}
        setExpMonth={setExpMonth}
        expYear={expYear}
        setExpYear={setExpYear}
        isOpen={cardModalOpen}
        onHandleVerifyCard={handleVerifyCard}
        onHandleClose={handleModalClose}
      />}
    </div>
  )
}

export default Card