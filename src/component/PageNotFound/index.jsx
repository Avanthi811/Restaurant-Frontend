import React from 'react';
import {  useNavigate } from 'react-router-dom';
import './index.css'; 

const NotFound = () => {
    const navigate = useNavigate();
    const handleToHomePage = () => {
        navigate('/');
    }
  return (
    <div className="not-found-container">
        <img src="https://res.cloudinary.com/dyihlpt5n/image/upload/v1757941142/erroring_1_2_txp8us.png"/>
      <h1 className="not-found-title">Page Not Found</h1>
      <p className="not-found-text">We are sorry, the page you requested could not be found</p>
        <p className='not-found-text'> Please go back to the homepage.</p>
      <button className="home-link" onClick={handleToHomePage}>Go to Home</button>
    </div>
  );
};

export default NotFound;
