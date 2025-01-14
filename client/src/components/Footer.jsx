import { Link } from 'react-router-dom'

import './Footer.css'



const Footer = () => {

  return (
    <div className='footer_container'>
      <p id='copyright'>{`${String.fromCodePoint(0x00A9)} 2005 Peter Rodocker`}</p>
      <div className='footer-link_container'>
        <Link to='/products' className='footer_link'>Products</Link>
        <Link to='/account' className='footer_link'>My Account</Link>
        <Link to='/checkout' className='footer_link'>Checkout</Link>
      </div>
    </div >
  )
}

export default Footer
