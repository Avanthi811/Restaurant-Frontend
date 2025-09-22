import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const EmptyCart = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOrderNow = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <>
    
      {loading ? (
        <div className="spinner-page-container">
          <img
            src="https://res.cloudinary.com/dyihlpt5n/image/upload/v1756827605/Loading_1_dlvzlw.png" 
            alt="Loading"
            className="center-spinner"
          />
        </div>
      ) : (
        <div>
           <div className="empty-cart-container">
          <img 
            src="https://res.cloudinary.com/dyihlpt5n/image/upload/v1756827159/cooking_1_2_slqqqb.png"
            alt="empty cart"
          />
          <h1 className='empty-cart-heading'>No Orders Yet!</h1>
          <p className='empty-cart-message'>Your cart is empty. Add something from the menu.</p>
          <button className="order-now-btn" onClick={handleOrderNow}>
            Order Now
          </button>
        </div>
        
        </div>
      )}
    </>
  );
};

export default EmptyCart;
