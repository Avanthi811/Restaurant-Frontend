import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import './index.css';

const Header = () => {
  const navigate =useNavigate()
  const onClickLogout= () => {
    Cookies.remove('jwt_token')
    navigate('/login',{replace:true})
  }
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-con">
          <Link to="/">
            <img
              className="nav-logo"
              src="https://res.cloudinary.com/dyihlpt5n/image/upload/v1752070346/Group_7420_el6poe.png"
              alt="logo"
            />
          </Link>
          <Link to="/" className="nav-title">
            Tasty Kitchens
          </Link>
        </div>
        <div className="nav-right">
          <div className="nav-menu">
            <Link to="/" className="nav-home">
              Home
            </Link>
            <Link to="/cart" className="nav-cart">
              Cart
            </Link>
          </div>
          <button className="nav-button" onClick={onClickLogout} >Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
