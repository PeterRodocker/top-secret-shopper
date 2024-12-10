import PaymentFields from "./PaymentFields"
import "./SinglePayment.css"

function SinglePayment({ pm, handler }) {

  return (
    <div className='payment' key={pm.id}>
      <div className="payment-input_container">
        <input
          id="payment_input"
          type="radio"
          defaultChecked={false}
          value={pm.id}
          onClick={handler}
        />
      </div>
      <PaymentFields pm={pm} />
    </div>
  )
}

export default SinglePayment
