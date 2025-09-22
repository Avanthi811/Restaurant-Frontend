import './index.css'
import Header from '../Header'
import Carousel from '../Carousel'
import Menu from '../Menu'
import Footer from '../Footer'
const Home = () =>{

  return (
    <div className='home-container'>
     <Header/>
     <Carousel/>
     <Menu/>
     <Footer/>
    </div>
  )
}
export default Home