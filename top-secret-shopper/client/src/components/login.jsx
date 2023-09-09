import React, { useState } from 'react'
import axios from 'axios'
import { Button, Form } from 'semantic-ui-react'

const Login = () => {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    axios.post('/api/users', {
      userName,
      password
    })
  }



  return (
    <div>
      <Form>
        <Form.Field>
          <label>Username</label>
          <input placeholder='username' onChange={(e) => setUserName(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder='password' onChange={(e) => setPassword(e.target.value)} />
        </Form.Field>
        <Button type='submit' onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
  )

}

export default Login

