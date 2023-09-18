import './productView.css'

const ProductView = (props) => {
  const { product: { name, imageURL, price, stockQty } } = props

  return (
    <div className="product-view__container">
      <h3>{name}</h3>
      <img className='product-view__image' src={imageURL} alt={name} />
      <p>${price}</p>
      <p>{stockQty} in stock</p>
    </div>

  )
}

export default ProductView