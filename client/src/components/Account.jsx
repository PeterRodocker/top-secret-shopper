import { useContext, useState } from 'react';

import AddAddressModal from './AddAddressModal'
import AddCardModal from './AddCardModal'
import AddressFields from './AddressFields'
import CardFields from './CardFields'
import { createNewAddress, deleteAddress } from '../utility/addressFuncs';
import { createNewCard, deleteCard } from '../utility/cardFuncs';
import { fetchUser } from '../utility/userFuncs';

import './Account.css'

import UserContext from '../contexts/UserContext';

function Account() {
  const addressSchema = {
    firstName: '',
    lastName: '',
    street: '',
    unit: '',
    city: '',
    state: '',
    zip: null,
  }

  const cardSchema = {
    name: '',
    type: '',
    number: null,
    exp: null,
    cvv: null,
    nickname: ''
  }

  const [user, setUser] = useContext(UserContext)
  const [newAddress, setNewAddress] = useState(addressSchema)
  const [newCard, setNewCard] = useState(cardSchema)
  const [addressModalOpen, setAddressModalOpen] = useState(false)
  const [cardModalOpen, setCardModalOpen] = useState(false)
  const token = window.localStorage.getItem('authorization')


  const handleAddAddress = async (token, newAddress) => {
    const address = await createNewAddress(token, newAddress)
    if (address) {
      const newUser = await fetchUser(token)
      setUser(newUser)
      setNewAddress(addressSchema)
      setAddressModalOpen(false)
    }
  }

  const handleCloseAddress = async () => {
    setAddressModalOpen(false)
  }

  const handleDeleteAddress = async (token, id) => {
    await deleteAddress(token, id)
    const user = await fetchUser(token)
    setUser(user)
  }

  const handleAddCard = async () => {
    const card = await createNewCard(token, newCard)
    if (card) {
      const newUser = await fetchUser(token)
      setUser(newUser)
      setNewCard(cardSchema)
      setCardModalOpen(false)
    }
  }

  const handleCloseCard = async () => {
    setCardModalOpen(false)
  }

  const handleDeleteCard = async (e, token, id) => {
    await deleteCard(token, id)
    const user = await fetchUser(token)
    setUser(user)
  }


  return (
    <div className='account_container'>
      <h1 className='account_heading'>{`${user.fullName}'s Account`}</h1>
      <div className='account-content_container'>
        <div className="addresses-cards_container">
          <div className="addresses_container">
            <h3>Addresses</h3>
            {user?.addresses?.map(address => (
              <div key={address.id} className='address-fields_container'>
                <AddressFields
                  address={address}
                  className='address-fields'
                  account='-delete'
                />
                <div className="delete_button-container">
                  <button
                    className='account_buttons account-delete_button'
                    onClick={() => handleDeleteAddress(token, address.id)}
                  >Remove This Address</button>
                </div>
              </div>
            ))}
            <div className="account-buttons_container">
              <button
                className='account_buttons account-add_button'
                onClick={() => setAddressModalOpen(true)}
              >Add An Address</button>
            </div>
          </div>
          <div className="cards_container">
            <h3>Payment Methods</h3>
            {user.cards.map(card => (
              <div key={card.id} className='card-fields_container'>
                <CardFields
                  card={card}
                  radius={'-radius'}
                  className='card-fields'
                />
                <div className="delete_button-container">
                  <button
                    className='account_buttons account-delete_button'
                    onClick={(e) => handleDeleteCard(e, token, card.id)}
                  >Remove This Card</button>
                </div>
              </div>
            ))}
            <div className="account-buttons_container">
              <button
                className='account_buttons account-add_button'
                onClick={() => setCardModalOpen(true)}
              >Add A Card</button>
            </div>
          </div>
        </div>
        <AddAddressModal
          isOpen={addressModalOpen}
          onHandleAddAddress={handleAddAddress}
          onHandleClose={handleCloseAddress}
          newAddress={newAddress}
          setNewAddress={setNewAddress}
        />
        <AddCardModal
          isOpen={cardModalOpen}
          onHandleAddCard={handleAddCard}
          onHandleClose={handleCloseCard}
          newCard={newCard}
          setNewCard={setNewCard}
        />
      </div>
    </div>
  )
}

export default Account
