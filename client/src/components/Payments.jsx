import PaymentFields from "./PaymentFields";
import SinglePayment from './SinglePayment'
import './Payments.css'


function Payments({ user, paymentMethod, setPaymentMethod }) {

  const handlePaymentSelect = (e) => {
    const tempPaymentMethod = user.paymentMethods.filter(pm => pm.id === parseInt(e.target.value))
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
          <PaymentFields pm={paymentMethod} />
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