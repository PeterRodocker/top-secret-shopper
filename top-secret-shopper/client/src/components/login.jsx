import React, { useState } from 'react'
import axios from 'axios'
import { Button, Form } from 'semantic-ui-react'

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    console.log('handle this')
    e.preventDefault()
    axios.post('/help', {
      username,
      password
    })
  }



  return (
    <div>
      <Form>
        <Form.Field>
          <label>Username</label>
          <input placeholder='username' onChange={(e) => setUsername(e.target.value)} />
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

