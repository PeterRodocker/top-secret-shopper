
import CardFields from "./CardFields"
import "./SingleCard.css"

function SingleCard({ card, onHandleNewCard, onHandleCardSelect, selected }) {
  return (
    <div>
      {selected ?
        <div className='card'>
          <CardFields card={card} selected='-selected' />
          <div className="new-card_button-container">
            <button
              name="new-card"
              className="new-card_button"
              onClick={onHandleNewCard}
            >
              Choose A Different Card
            </button>
          </div>
        </div>
        :
        <div className='single-card' key={card.id}>
          <div className="card-input_container">
            <button
              id="card_button"
              value={card.id}
              onClick={onHandleCardSelect}
            >
              Choose This Card
            </button>
          </div>
          <CardFields card={card} />
        </div>
      }
    </div>
  )
}

export default SingleCard
