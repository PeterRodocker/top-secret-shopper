import { useContext, useEffect, useState } from 'react'
import { Modal } from 'semantic-ui-react';
import axios from 'axios'

import './AddAddressModal.css'


const AddAddressModal = ({ isOpen, onHandleAddAddress, onHandleClose, newAddress, setNewAddress }) => {
  const { firstName, lastName, street, unit, city, state, zip } = newAddress
  const token = window.localStorage.getItem('authorization')


  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({
      ...newAddress,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    onHandleAddAddress(token, newAddress)
  }

  return (
    <Modal
      open={isOpen}
      onClose={onHandleClose}
    >
      <form className='address_form'>
        <input
          name="firstName"
          value={firstName}
          placeholder='First Name'
          className='add-address-modal_input'
          onChange={handleChange}
        />
        <input
          name="lastName"
          value={lastName}
          placeholder='Last Name'
          className='add-address-modal_input'
          onChange={handleChange} />
        <input
          name="street"
          value={street}
          placeholder='Street Address'
          className='add-address-modal_input'
          onChange={handleChange} />
        <input
          name="unit"
          value={unit ? unit : ''}
          placeholder='Unit'
          className='add-address-modal_input'
          onChange={handleChange} />
        <input
          name="city"
          value={city}
          placeholder='City'
          className='add-address-modal_input'
          onChange={handleChange} />
        <input
          name="state"
          value={state}
          placeholder='State'
          className='add-address-modal_input'
          onChange={handleChange} />
        <input
          name="zip"
          value={zip ? zip : ''}
          placeholder='Zip Code'
          className='add-address-modal_input'
          onChange={handleChange} />
        <button
          className='address_button-submit'
          type='submit'
          onClick={handleSubmit}
        >
          Add Address
        </button>
      </form>
    </Modal>
  )
}

export default AddAddressModal
