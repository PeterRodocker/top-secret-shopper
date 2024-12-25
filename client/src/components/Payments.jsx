import axios from 'axios'

import PaymentFields from "./PaymentFields";
import SinglePayment from './SinglePayment'
import './Payments.css'


function Payments({ user, paymentMethod, setPaymentMethod }) {
  const token = window.localStorage.getItem('authorization')

  const handlePaymentSelect = async (e) => {
    let correctBilling
    const tempPaymentMethod = user.paymentMethods.filter(pm => pm.id === parseInt(e.target.value))
    const { data: dbCard } = await axios.get(`api/paymentMethods/${user.id}/method/${tempPaymentMethod.id}`, {
      headers: { authorization: token }
    })
    console.log('***dbCard***', dbCard)

    // We've selected a card
    // pull that card with that id from the db
    // see if the billing address equals the one selected
    // if not, open select modal
    // if so, allow selection

    setPaymentMethod(tempPaymentMethod[0])
    window.localStorage.setItem('paymentMethod', JSON.stringify(tempPaymentMethod[0]))
  }

  const handleNewPaymentMethod = () => {
    setPaymentMethod({})
    window.localStorage.setItem('paymentMethod', JSON.stringify({}))
  }

  return (
    <div className='payment_container'>
      {paymentMethod.id ?
        <div className='payment'>
          <PaymentFields pm={paymentMethod} selected='-selected' />
          <div className="new-pm_label-input">
            {paymentMethod.id ? <p className="new-pm_label">Choose Different Payment Method</p> : ''}
            <input
              name="new-pm"
              type="radio"
              defaultChecked={false}
              className="new-pm_input"
              onChange={handleNewPaymentMethod}
            />
          </div>
        </div>
        :
        user?.paymentMethods?.map(pm => (
          < SinglePayment
            pm={pm}
            handler={handlePaymentSelect}
            key={pm.id}
          />
        ))
      }
    </div>
  )
}

export default Payments