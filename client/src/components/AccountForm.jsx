import './AccountForm.css'

const AccountForm = ({
  firstName,
  lastName,
  address: { street, unit, city, state, zip },
  onHandleChange,
  onHandleSubmit
}) => {

  return (
    <form className='account__form'>
      <div className="account-form_label-input">
        <label className='account-form_label'>First Name</label>
        <input
          name="firstName"
          type="text"
          value={firstName}
          onChange={onHandleChange()}
        />
      </div>
      <div className="account-form_label-input">
        <label className='account-form_label'>Last Name</label>
        <input
          name="lastName"
          type="text"
          value={lastName}
          onChange={onHandleChange()} />
      </div>
      <div className="account-form_label-input">
        <label className='account-form_label'>Street</label>
        <input
          name="street"
          type="text"
          value={street}
          onChange={onHandleChange('addresses')} />
      </div>
      <div className="account-form_label-input">
        <label className='account-form_label'>Unit</label>
        <input
          name="unit"
          type="text"
          value={unit}
          onChange={onHandleChange('addresses')} />
      </div>
      <div className="account-form_label-input">
        <label className='account-form_label'>City</label>
        <input
          name="city"
          type="text"
          value={state}
          onChange={onHandleChange('addresses')} />
      </div>
      <div className="account-form_label-input">
        <label className='account-form_label'>State</label>
        <input
          name="state"
          type="text"
          value={state}
          onChange={onHandleChange('addresses')} />
      </div>
      <div className="account-form_label-input">
        <label className='account-form_label'>Zip Code</label>
        <input
          name="zip"
          type="text"
          value={zip}
          onChange={onHandleChange('addresses')} />
      </div>
      <button className='button-submit' type='submit' onClick={onHandleSubmit}>Update</button>
    </form>
    // <Form className='account__form'>
    //   <Form.Field>
    //     <label className='label'>First Name</label>
    //     <input
    //       name="firstName"
    //       type="text"
    //       value={firstName}
    //       onChange={onHandleChange()}
    //     />
    //   </Form.Field>
    //   <Form.Field>
    //     <label className='label'>Last Name</label>
    //     <input
    //       name="lastName"
    //       type="text"
    //       value={lastName}
    //       onChange={onHandleChange()} />
    //   </Form.Field>
    //   <Form.Field>
    //     <label className='label'>Street</label>
    //     <input
    //       name="street"
    //       type="text"
    //       value={street}
    //       onChange={onHandleChange('addresses')} />
    //   </Form.Field>
    //   <Form.Field>
    //     <label className='label'>Unit</label>
    //     <input
    //       name="unit"
    //       type="text"
    //       value={unit}
    //       onChange={onHandleChange('addresses')} />
    //   </Form.Field>
    //   <Form.Field>
    //     <label className='label'>State</label>
    //     <input
    //       name="state"
    //       type="text"
    //       value={state}
    //       onChange={onHandleChange('addresses')} />
    //   </Form.Field>
    //   <Form.Field>
    //     <label className='label'>Zip Code</label>
    //     <input
    //       name="zip"
    //       type="text"
    //       value={zip}
    //       onChange={onHandleChange('addresses')} />
    //   </Form.Field>
    //   <Button className='button-submit' type='submit' onClick={onHandleSubmit}>Update</Button>
    // </Form>
  )
}

export default AccountForm



