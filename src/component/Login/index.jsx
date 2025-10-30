import './index.css'
import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const [showerror, setShowError] = useState(false)

  const onChangeUsername = event => setUsername(event.target.value)
  const onChangePassword = event => setPassword(event.target.value)

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, { expires: 30 })
    navigate('/', { replace: true })
  }

  const onSubmitFailure = errorMsg => {
    setErrorMessage(errorMsg)
    setShowError(true)
  }

  const submitForm = async event => {
    event.preventDefault()
    const userDetails = { name:username, password }

    const apiurl = `https://restaurant-backend-nkkg.onrender.com/api/login`
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiurl, options)
    const data = await response.json()

    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.message)
    }
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Navigate to="/" />
  }

  return (
    <div className="container">
      <div className="left-container">
        <form className="form-box" onSubmit={submitForm}>
          <img
            className="logo"
            src="https://res.cloudinary.com/dyihlpt5n/image/upload/v1752070346/Group_7420_el6poe.png"
            alt="logo"
          />
          <h1 className="tasty">Tasty Kitchens</h1>
          <h1 className="login-text">Login</h1>

          <label htmlFor="username" className="label">USERNAME</label>
          <input
            type="text"
            id="username"
            className="inputbox"
            placeholder="Username"
            onChange={onChangeUsername}
            value={username}
          />

          <label htmlFor="password" className="label">PASSWORD</label>
          <input
            type="password"
            id="password"
            className="inputbox"
            placeholder="Password"
            onChange={onChangePassword}
            value={password}
          />

          {showerror && <p className="error-message">**{errorMessage}</p>}

          <button type="submit" className="login-button">Login</button>
          <p className="switch-text">
            Don’t have an account? <Link to="/register" className="link">Register</Link>
          </p>
        </form>
      </div>

      <div className="right-container">
        <img
          className="side-image"
          src="https://res.cloudinary.com/dyihlpt5n/image/upload/v1752135978/ceff20e8367d1981f2a409a617ac848670d29c7e_r4uw4v.jpg"
          alt="side food"
        />
      </div>
    </div>
  )
}

export default Login
