import './CardFields.css'

function CardFields({ card, radius, selected }) {

  return (
    <div className={`card-fields card-fields${selected} card-fields${radius}`}>
      <div className="card-row">
        <p className="card-field_label">Name:</p>
        <p className='card-field' >{card.name}</p>
      </div>
      <div className="card-row">
        <p className="card-field_label">Type:</p>
        <p className='card-field' >{card.type}</p>
      </div>
      <div className="card-row">
        <p className="card-field_label">Number:</p>
        <p className='card-field' >{card.number}</p>
      </div>
      {card.nickname &&
        <div className="card-row">
          <p className="card-field_label">Nickname:</p>
          <p className='card-field' >{card.nickname}</p>
        </div>}
    </div>
  )
}



export default CardFields
