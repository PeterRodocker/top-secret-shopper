import { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import './AccountForm.css'

import UserContext from '../contexts/UserContext';


const AccountForm = () => {
  const [user, setUser] = useContext(UserContext)
  const [profileFields, setProfileFields] = useState(user)
  const [address, setAddress] = useState({})
  const [errors, setErrors] = useState({})

  const { firstName, lastName, addresses } = profileFields
  const { street, unit, city, state, zip } = address
  const token = window.localStorage.getItem('authorization')

  useEffect(() => {
    getPrimaryAddress()
  }, [profileFields])

  const getPrimaryAddress = () => {
    if (addresses && addresses.length > 0) {
      const primaryAddress = addresses.find(a => a.isPrimary)
      if (primaryAddress) setAddress(primaryAddress)
    }
  }

  const handleChange = property => (e) => {
    const { name, value } = e.target;

    if (!property) {
      setProfileFields({
        ...profileFields,
        [name]: value
      })
    }
    else {
      const updatedAddresses = profileFields[property].map(a => {
        if (a.id === address.id) {
          const updatedAddress = { ...a, [name]: value }
          return updatedAddress
        }
        else return { ...a }
      })
      if (updatedAddresses) {
        setProfileFields({
          ...profileFields,
          [property]: updatedAddresses
        })
      }
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data: updatedUser } = await axios.put('api/users/update', {
        profileFields
      }, {
        headers: { authorization: token }
      })
      setUser(updatedUser)
      setErrors({})
    } catch (error) {
      console.error('Error updating user', error)
      setErrors(error.response.data || {})
    }
  }

  return (
    <form className='account__form'>
      <div className="account__grid">
        <label>First Name</label>
        <input
          name="firstName"
          type="text"
          value={firstName}
          onChange={handleChange()}
        />
        <label>Last Name</label>
        <input
          name="lastName"
          type="text"
          value={lastName}
          onChange={handleChange()} />
        <label>Street</label>
        <input
          name="street"
          type="text"
          value={street ? street : ''}
          onChange={handleChange('addresses')} />
        <label>Unit</label>
        <input
          name="unit"
          type="text"
          value={unit ? unit : ''}
          onChange={handleChange('addresses')} />
        <label>City</label>
        <input
          name="city"
          type="text"
          value={city ? city : ''}
          onChange={handleChange('addresses')} />
        <label>State</label>
        <input
          name="state"
          type="text"
          value={state ? state : ''}
          onChange={handleChange('addresses')} />
        <label>Zip Code</label>
        <input
          name="zip"
          type="text"
          value={zip ? zip : ''}
          onChange={handleChange('addresses')} />
      </div>
      <button
        className='account__button-submit'
        type='submit'
        onClick={handleSubmit}
      >
        Update
      </button>
    </form>
  )
}

export default AccountForm



