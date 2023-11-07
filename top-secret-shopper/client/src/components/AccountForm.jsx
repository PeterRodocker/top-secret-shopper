

import { Button, Form } from 'semantic-ui-react'

const AccountForm = ({
  firstName,
  lastName,
  address: { street, unit, state, zip },
  onHandleChange,
  onHandleSubmit
}) => {

  return (
    <Form className='account__form'>
      <Form.Field>
        <label className='label'>First Name</label>
        <input
          name="firstName"
          type="text"
          value={firstName}
          onChange={onHandleChange()}
        />
      </Form.Field>
      <Form.Field>
        <label className='label'>Last Name</label>
        <input
          name="lastName"
          type="text"
          value={lastName}
          onChange={onHandleChange()} />
      </Form.Field>
      <Form.Field>
        <label className='label'>Street</label>
        <input
          name="street"
          type="text"
          value={street}
          onChange={onHandleChange('addresses')} />
      </Form.Field>
      <Form.Field>
        <label className='label'>Unit</label>
        <input
          name="unit"
          type="text"
          value={unit}
          onChange={onHandleChange('addresses')} />
      </Form.Field>
      <Form.Field>
        <label className='label'>State</label>
        <input
          name="state"
          type="text"
          value={state}
          onChange={onHandleChange('addresses')} />
      </Form.Field>
      <Form.Field>
        <label className='label'>Zip Code</label>
        <input
          name="zip"
          type="text"
          value={zip}
          onChange={onHandleChange('addresses')} />
      </Form.Field>
      <Button className='button-submit' type='submit' onClick={onHandleSubmit}>Update</Button>
    </Form>
  )
}

export default AccountForm



