import './index.css'
import { FaStar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
const MenuList = ({ details }) => {
  const { id, name, cuisine, image_url, rating, reviews_count } = details
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/restaurant/${id}`)
  }

  return (
    <div className="restaurant-card" onClick={handleClick}>
      <img src={image_url} alt={name} className="food-img" />
      <div className="details">
        <h4 className="restaurant-name">{name}</h4>
        <p className="restaurant-cuisine">{cuisine}</p>
        <div className="restaurant-rating">
          <FaStar className="star-icon" />
          <span className="rating-value">{rating}</span>
          <span className="rating-count"> ({reviews_count} ratings)</span>
        </div>
      </div>
    </div>
  )
}

export default MenuList