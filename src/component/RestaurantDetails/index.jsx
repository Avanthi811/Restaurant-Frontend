import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Cookies from 'js-cookie'
import { FaStar } from 'react-icons/fa'
import './index.css'

const RestaurantDetails = () => {
  const { id } = useParams()
  const [details, setDetails] = useState(null)
  const [foodItems, setFoodItems] = useState([])
  const [itemCounts, setItemCounts] = useState({}) 

  useEffect(() => {
    const fetchDetails = async () => {
      const jwtToken = Cookies.get('jwt_token')
      const apiUrl = `https://restaurant-backend-nkkg.onrender.com/api/restaurant/${id}`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }

      const response = await fetch(apiUrl, options)
      if (response.ok) {
        console.log(response);
        const data = await response.json()
        console.log(data);
        setDetails(data)
        setFoodItems(data.food_items)
      }
    }
    fetchDetails()

      const cart = JSON.parse(localStorage.getItem('cart')) || []
      const initialCounts = {}
      cart.forEach(item => {
        initialCounts[item.id] = item.quantity
      })
      setItemCounts(initialCounts)

  }, [id])

  if (!details) return <p>Loading...</p>

 
 const increment = (itemId) => {
  setItemCounts(prev => {
    const newCount = (prev[itemId] || 0) + 1

    const selectedItem = foodItems.find(item => item.id === itemId)
    let cart = JSON.parse(localStorage.getItem('cart')) || []

    const existingItemIndex = cart.findIndex(item => item.id === itemId)

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity = newCount
    } else {
      cart.push({
        id: selectedItem.id,
        name: selectedItem.name,
        image_url: selectedItem.image_url,
        cost: selectedItem.cost,
        quantity: newCount
      })
    }

    localStorage.setItem('cart', JSON.stringify(cart))

    return {
      ...prev,
      [itemId]: newCount
    }
  })
}

const decrement = (itemId) => {
  setItemCounts(prev => {
    const newCount = Math.max((prev[itemId] || 0) - 1, 0)

    let cart = JSON.parse(localStorage.getItem('cart')) || []
    const existingItemIndex = cart.findIndex(item => item.id === itemId)

    if (existingItemIndex > -1) {
      if (newCount === 0) {
        cart.splice(existingItemIndex, 1) 
      } else {
        cart[existingItemIndex].quantity = newCount
      }
    }

    localStorage.setItem('cart', JSON.stringify(cart))

    return {
      ...prev,
      [itemId]: newCount
    }
  })
}

  return (
    <>
      <Header />
      <div>
        <div className='banner'>
          <img className="banner-image" src={details.image_url} alt={details.name} />
          <div className="banner-content">
            <h2>{details.name}</h2>
            <p>{details.cuisine}</p>
            <p>{details.location}</p>
            <p><FaStar className="star-icon2" />{details.rating}</p>
            <p>200+ Ratings</p>
          </div>
        </div>

        <div className='restaurant-details'>
          <ul className="food-items-list">
            {foodItems.slice(0, 12).map(item => {
              const count = itemCounts[item.id] || 0
              return (
                <li key={item.id} className="food-item-card">
                  <img src={item.image_url} alt={item.name} className="food-image" />
                  <div className="food-info">
                    <p>{item.name}</p>
                    <p> ₹ {item.cost}</p>
                    <p><FaStar className="star-icon2" />{item.rating}</p>

                    {count === 0 ? (
                      <button className='add-btn' onClick={() => increment(item.id)}>Add</button>
                    ) : (
                      <div className='quantity-controls'>
                        <button onClick={() => decrement(item.id)}>-</button>
                        <div>{count}</div>
                        <button onClick={() => increment(item.id)}>+</button>
                      </div>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default RestaurantDetails
