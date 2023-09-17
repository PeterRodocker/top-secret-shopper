const ProductView = (props) => {
  const { product: { name, imageURL, price, stockQty } } = props

  return (
    <div style={{ margin: '5rem' }} className="product-view">
      <h3>{name}</h3>
      <img style={{ maxWidth: '250px' }} src={imageURL} alt={name} />
      <p>${price}</p>
      <p>{stockQty} in stock</p>
    </div>

  )
}

export default ProductView