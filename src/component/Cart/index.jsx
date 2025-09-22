import { useEffect, useState } from 'react'
import './index.css'
import Footer from '../Footer'
import Header from '../Header'
import { useNavigate } from 'react-router-dom'
import EmptyCart from '../EmptyCart'

const Cart = () => {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || []
    setCartItems(storedCart)
  }, [])

  const increment = id => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
    updateCart(updatedCart)
  }

  const decrement = id => {
    const updatedCart = cartItems
      .map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0) 

    updateCart(updatedCart)
  }

  const updateCart = newCart => {
    setCartItems(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const orderTotal = cartItems.reduce(
    (total, item) => total + item.cost * item.quantity,
    0
  )

  const navigate = useNavigate()

  const handlePlaceOrder = () => {
    localStorage.removeItem('cart')
    navigate('/payment-success')
  }

  return (
    <div>
      <Header />
      <div className="cart-container">
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className='cart-items'>
            <div className="cart-table">
              <div className="cart-row header">
                <div>Item</div>
                <div>Quantity</div>
                <div>Price</div>
              </div>

              {cartItems.map(item => (
                <div key={item.id} className="cart-row">
                  <div className="cart-item">
                    <img src={item.image_url} alt={item.name} className="cart-img" />
                    <span>{item.name}</span>
                  </div>
                  <div className="quantity-controls">
                    <button onClick={() => decrement(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increment(item.id)}>+</button>
                  </div>
                  <div className="item-price">₹ {item.cost * item.quantity}.00</div>
                </div>
              ))}
            </div>

            <hr className="divider" />

            <div className="total-container">
              <h3>Order Total :</h3>
              <h3>₹ {orderTotal}.00</h3>
            </div>

            <button className="place-order-btn" onClick={handlePlaceOrder}>
              Place Order
            </button>
            
          </div>
          
        )}
        
      </div>
      {cartItems.length > 0 && <Footer />}
    </div>
  )
}

export default Cart
