<<<<<<< HEAD
<<<<<<< HEAD
import React, {useState} from 'react'
=======
import React, { useState } from 'react'
>>>>>>> 15587dcc1948524d11684288b1009e4f29eed8ba
=======
import React, { useState } from 'react'
>>>>>>> peter
import axios from 'axios'
import { Button, Form } from 'semantic-ui-react'

const Login = () => {
<<<<<<< HEAD
<<<<<<< HEAD
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const firstName = username
    const lastName = password


    const handleSubmit = (e) => {
        e.preventDefault()
        // axios.post('https://64e78e68b0fd9648b7901b1e.mockapi.io/fakedata', {
        //     username,
        //     password
        // })

        axios.post('https://64e78e68b0fd9648b7901b1e.mockapi.io/fakedata', {
            firstName,
            lastName
        })
    }

    
    
    return (
    <div>
        <Form>
            <Form.Field>
                <label>Username</label>
                <input placeholder='username' onChange={(e) => setUsername(e.target.value)}/>
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input placeholder='password' onChange={(e) => setPassword(e.target.value)}/>
            </Form.Field>
            <Button type='submit' onClick={handleSubmit}>Submit</Button>
        </Form>
    </div>
    )

}

export default Login

=======
=======

>>>>>>> peter

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const firstName = username
  const lastName = password


  const handleSubmit = async (e) => {
    e.preventDefault()
    axios.post('/', {
      firstName,
      lastName
    })
    axios.post('/')
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
<<<<<<< HEAD
>>>>>>> 15587dcc1948524d11684288b1009e4f29eed8ba
=======
>>>>>>> peter
