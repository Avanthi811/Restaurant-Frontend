import { BrowserRouter,Routes,Route } from 'react-router'

import Register from './component/Register'
import Login from './component/login'
import Home from './component/Home'
import Cart from './component/Cart'
import ProtectedRoute from './component/ProtectedRoute'
import RestaurantDetails from './component/RestaurantDetails'
import PaymentSuccess from './component/PaymentSuccessfull'
import PageNotFound from './component/PageNotFound'
const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
        <Route path="/restaurant/:id" element={<ProtectedRoute><RestaurantDetails /></ProtectedRoute>} />
        <Route path="/payment-success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
