
import AccountForm from './AccountForm'
import './Account.css'



function Account() {

  return (
    <div className='account__container'>
      <h1 className='account__heading'>Your Account</h1>
      {
        <AccountForm />
      }
    </div>
  )
}

export default Account
