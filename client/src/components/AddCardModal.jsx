import { useContext, useEffect, useState } from 'react'
import { Modal } from 'semantic-ui-react';
import axios from 'axios'

import './AddCardModal.css'


const AddCardModal = ({ isOpen, onHandleAddCard, onHandleClose, newCard, setNewCard }) => {
  const { name, type, number, exp, cvv, nickname } = newCard
  const token = window.localStorage.getItem('authorization')


  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCard({
      ...newCard,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    onHandleAddCard(token, newCard)
  }

  return (
    <Modal
      open={isOpen}
      onClose={onHandleClose}
    >
      <form className='card_form' id='card-form'>
        <input
          name="name"
          value={name}
          placeholder='Name on Card'
          className='add-card-modal_input'
          onChange={handleChange}
        />
        <input
          name="type"
          value={type}
          placeholder='Card Type'
          className='add-card-modal_input'
          onChange={handleChange} />
        <input
          name="number"
          value={number ? number : ''}
          placeholder='Card Number'
          className='add-card-modal_input'
          onChange={handleChange} />
        <input
          name="exp"
          value={exp ? exp : ''}
          placeholder='4-Digit Expiration Date'
          maxLength={4}
          className='add-card-modal_input'
          onChange={handleChange} />
        <input
          name="cvv"
          value={cvv ? cvv : ''}
          placeholder='3-Digit CVV Number'
          maxLength={3}
          className='add-card-modal_input'
          onChange={handleChange} />
        <input
          name="nickname"
          value={nickname}
          placeholder='Card Nickname'
          className='add-card-modal_input'
          onChange={handleChange} />
        <button
          className='card_button-submit'
          type='submit'
          onClick={handleSubmit}
        >
          Add Card
        </button>
      </form>
    </Modal>
  )
}

export default AddCardModal
