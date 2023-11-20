import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Form } from 'semantic-ui-react'

import AccountForm from './AccountForm'
import './Account.css'

import UserContext from '../contexts/UserContext';

function Account() {
  const [user, setUser] = useContext(UserContext)
  const [profileFields, setProfileFields] = useState(user)
  const [address, setAddress] = useState({})

  const { firstName, lastName } = profileFields
  const token = window.localStorage.getItem('authorization')

  useEffect(() => {
    getPrimaryAddress()
  }, [profileFields])

  const getPrimaryAddress = () => {
    if (profileFields.addresses) {
      profileFields.addresses.forEach(address => {
        if (address.isPrimary) setAddress(address)
      })
    }
  }

  const handleChange = level => (e) => {
    const { name, value } = e.target;

    if (!level) {
      setProfileFields({
        ...profileFields,
        [name]: value
      })
    } else {
      const updatedAddresses = profileFields[level].map(a => {
        if (a.id === address.id) {
          const updatedAddress = { ...a, [name]: value }
          return updatedAddress
        }
        else return { ...a }
      })
      if (updatedAddresses) {
        setProfileFields({
          ...profileFields,
          [level]: updatedAddresses
        })
      }
    }
  }

  const handleSubmit = async () => {
    const { data: updatedUser } = await axios.put('api/users/update', {
      profileFields
    }, {
      headers: { authorization: token }
    })
    setUser(updatedUser)
  }

  return (
    <>
      <p style={{ color: 'white' }}>Your Account</p>
      {address.street ?
        <AccountForm
          firstName={firstName}
          lastName={lastName}
          address={address}
          onHandleChange={handleChange}
          onHandleSubmit={handleSubmit}
        /> : ''
      }
    </>
  )
}

export default Account
