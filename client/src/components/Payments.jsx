import './Payments.css'

import SinglePayment from './SinglePayment'

function Payments({ user: { paymentMethods, setPaymentMethod } }) {
  return (
    <div>
      <h3>Payments Methods</h3>
      {paymentMethods.map(pm => (
        < SinglePayment key={pm.id} pm={pm} handler={setPaymentMethod} />
      ))}
    </div>
  )
}

export default Payments