
import Header from '../Header'
import { useNavigate} from 'react-router-dom'
import './index.css'
const payment = () => {
  const navigate = useNavigate();
  const handleToHomePage =()=>{
    navigate('/')
  }
  return (
    <>
    <Header/>
    <div className='payment-successful-container'>
    <img src="https://res.cloudinary.com/dyihlpt5n/image/upload/v1756827164/check-circle.1_1_1_zh2vyj.png" alt="Success" className='img' />
      <h2 className='heading'>Payment Successful</h2>
      <p className='paragraph'>Thank you for ordering</p>
      <p className='paragraph'>Your payment is successfully completed.</p>
      <button className='button' onClick={handleToHomePage}>Go To Home Page</button>
    </div>
    </>
  )
}

export default payment;
