
import CardFields from "./CardFields"
import "./SingleCard.css"

function SingleCard({ card, onHandleNewCard, onHandleCardSelect, selected }) {
  return (
    <div>
      {selected ?
        <div className='card'>
          <CardFields card={card} selected='-selected' />
          <div className="new-card_label-input">
            {card.id ? <p className="new-card_label">Choose Different Card</p> : ''}
            <input
              name="new-card"
              type="radio"
              defaultChecked={false}
              className="new-card_input"
              onChange={onHandleNewCard}
            />
          </div>
        </div>
        :
        <div className='single-card' key={card.id}>
          <div className="card-input_container">
            <input
              id="card_input"
              type="radio"
              defaultChecked={false}
              value={card.id}
              onClick={onHandleCardSelect}
            />
          </div>
          <CardFields card={card} />
        </div>
      }
    </div>
  )
}

export default SingleCard
