import Ellipse from "../assets/Ellipse.png"
// import Expense from "../../assets/expenses.png"
import HomeImage from "../assets/HomeImage.jpeg"
import grayHomeImage from "../assets/grayHome.webp"
import {Link} from "react-router-dom"

function Home() {
    return (
      <div>
        <div className='bg-white h-screen flex px-[10%] py-[6%]'>
            <div className='flex-1 text-black pt-7 '>
                <div className='absolute py-12 left-20'>
                    <h1 className='font-Poppins font-bold text-5xl leading-[72px] py-5'>Welcome to the <br /> Look<span className="text-orange-400">Book</span></h1>
                    <h3 className='pb-5 text-lg leading-relaxed text-gray-400'>Discover your unique style and shop for clothes <br />based on minimalistic styling methods while also <br />organizing your wardrobe</h3>
                    <Link to="/register"><button className='px-10 py-4 text-xs font-bold tracking-wide rounded-full bg-gradient-to-r from-gray-300 to-orange-400 w-100 hover:scale-110 duration 300'>GET STARTED</button></Link>
                </div>
            </div>
            <div className='flex-1'>
                <img src={HomeImage} className='w-`9/12 h-screen mt-0 z-30 rounded-full' />
            </div>
        </div>
        <div className='bg-black'>
          
        </div>
      </div>
    )
  }
  
  export default Home
