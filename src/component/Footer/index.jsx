import './index.css'

const Footer = () =>{
     return(
        <div className='footer-container'>
             <div className='container1'>
                <img className='footer-image' src="https://res.cloudinary.com/dyihlpt5n/image/upload/v1752932565/Group_7420_1_eexz29.png"/>
                <h1 className='footer-heading'>Tasty Kitchen</h1>
             </div>
             <p className='footer-para'>The only thing we are serious about is food.</p>
            <p className='footer-para'>Contact us on</p>
             <div className='logos'>
                <img className='logo-img' src="https://res.cloudinary.com/dyihlpt5n/image/upload/v1752934697/Frame_12_uioz7w.png"/>
                <img className='logo-img' src="https://res.cloudinary.com/dyihlpt5n/image/upload/v1752934704/Frame_10_fdah3o.png"/>
                <img className='logo-img' src="https://res.cloudinary.com/dyihlpt5n/image/upload/v1752934719/Frame_11_ijkl3p.png"/>
                <img className='logo-img' src="https://res.cloudinary.com/dyihlpt5n/image/upload/v1752934727/Frame_13_kgukyb.png"/>
             </div>
        </div>
     )
}
export default Footer