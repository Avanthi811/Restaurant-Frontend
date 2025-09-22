import './index.css'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import MenuList from '../MenuList'

const Menu = () => {
  const [restaurants, setRestaurants] = useState([])
  const [sortOrder, setSortOrder] = useState('default')
  const [showDropdown, setShowDropdown] = useState(false)
  const [page, setPage] = useState(1)
  const [total,setTotal] = useState(0);
  const LIMIT = 9

  const getItems = async () => {
    // const offset = (page - 1) * LIMIT
    // console.log(offset)
    console.log(page)
    const apiurl = `http://localhost:5008/api/restaurant?page=${page}&limit=${LIMIT}&sort=${sortOrder}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiurl, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data);
      setTotal(data.total)
      // let sortedRestaurants = [...data.data]
      
      // if (sortOrder === 'asc') {
      //   sortedRestaurants.sort((a, b) => a.user_rating.rating - b.user_rating.rating)
      // } else if (sortOrder === 'desc') {
      //   sortedRestaurants.sort((a, b) => b.user_rating.rating - a.user_rating.rating)
      // }

      setRestaurants(data.data)
      
    }
  }

  useEffect(() => {
    getItems()
  }, [sortOrder, page])

  const totalPages = Math.ceil(total / LIMIT) || 1 

  const goToPrevPage = () => {
    if (page > 1) setPage(prev => prev - 1)
  }

  const goToNextPage = () => {
    if (page < totalPages) setPage(prev => prev + 1)
  }

  return (
    <div className="menu-container">
      <div className="menu-header">
        <div>
          <h2 className="menu-heading">Popular Restaurants</h2>
          <p className="sub-heading">
            Select your favourite restaurant special dish and make your day happy...
          </p>
        </div>
        <div className="custom-sort-dropdown">
          <button
            className="dropdown-toggle"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span className="icon"><img  src="https://res.cloudinary.com/dyihlpt5n/image/upload/v1756827396/sort_1_uzewoc.png"/></span> Sort by{' '} 
            {sortOrder === 'asc' ? 'Lowest' : sortOrder === 'desc' ? 'Highest' : 'Default'}
            <div className="arrow-icon"><img src="https://res.cloudinary.com/dyihlpt5n/image/upload/v1756827180/Frame_16_1_bsz34n.png"/></div>
          </button>

          {showDropdown && (
            <ul className="dropdown-menu">
              <li
                onClick={() => {
                  setSortOrder('default')
                  setShowDropdown(false)
                }}
              >
                Default {sortOrder === 'default' && <span className="check">✔</span>}
              </li>
              <li
                onClick={() => {
                  setSortOrder('asc')
                  setShowDropdown(false)
                }}
              >
                Lowest {sortOrder === 'asc' && <span className="check">✔</span>}
              </li>
              <li
                onClick={() => {
                  setSortOrder('desc')
                  setShowDropdown(false)
                }}
              >
                Highest {sortOrder === 'desc' && <span className="check">✔</span>}
              </li>
              
            </ul>
          )}
        </div>
      </div>

      <hr className="line" />

      <div className="restaurant-list">
        {restaurants.map(restaurant => (
          <MenuList key={restaurant.id || restaurant._id} details={restaurant} />
        ))}
      </div>

      <div className="pagination">
        <img
          src="https://res.cloudinary.com/dyihlpt5n/image/upload/v1752641211/Icon_1_fnobr1.png"
          alt="left arrow"
          onClick={goToPrevPage}
          className="arrow"
        />
        <div>{`Page ${page} of ${totalPages}`}</div>
        <img
          src="https://res.cloudinary.com/dyihlpt5n/image/upload/v1752641766/Icon_1_vf0du3.png"
          alt="right arrow"
          onClick={goToNextPage}
          className="arrow"
        />
      </div>
    </div>
  )
}

export default Menu
