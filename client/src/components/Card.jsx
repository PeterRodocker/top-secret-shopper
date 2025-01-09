import { useEffect, useState } from 'react';

import CardModal from './CardModal';
import SingleCard from './SingleCard'
import './Card.css'

import { fetchAndVerifyCard } from '../utility/cardFuncs';
import { getLocalStorage } from '../utility/localStorageFuncs';


function Card({ selectedCard, setSelectedCard, user, verifiedCard, setVerifiedCard }) {
  const [cvv, setCvv] = useState(0)
  const [exp, setExp] = useState(0)
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
    const verifiedCard = await fetchAndVerifyCard(token, cvv, exp, user.id)

    if (verifiedCard) {
      setVerifiedCard(verifiedCard)
      window.localStorage.setItem('verifiedCard', JSON.stringify(verifiedCard))

      setCardModalOpen(false)
    }
    setCvv(0)
    setExp(0)
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
      {cardModalOpen && <CardModal
        cvv={cvv}
        setCvv={setCvv}
        exp={exp}
        setExp={setExp}
        isOpen={cardModalOpen}
        onHandleVerifyCard={handleVerifyCard}
        onHandleClose={handleModalClose}
      />}
    </div>
  )
}

export default Card