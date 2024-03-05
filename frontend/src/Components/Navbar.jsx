import React,{useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import { useCookies } from 'react-cookie'
function Navbar() {

  const [cookies, setCookies] = useCookies(["access_token"])
  const [profilePressed, setProfilePressed] = useState(false)
  const navigate = useNavigate()

  //change colour onScroll
  const [color, setColor] = useState(false)
  const changeColor = () => {
    if(window.scrollY >=90){
      setColor(true)
    }
  }
  window.addEventListener('scroll', changeColor)

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/login")
  }

  const profile = () => {
    navigate("/profile")
  }
  
  
  return (
    <nav className='fixed top-0 left-0 z-10 w-full pt-4 pb-4 text-black rounded-sm bg-background font-Poppins'>
        <div className='container flex justify-between mx-auto'>
            <Link to="/"><span className='text-3xl font-bold '> The Look<span className='text-3xl font-bold text-primary'>Book</span> </span></Link>
            <ul className='flex items-center text-sm tracking-wide gap-x-8'>
                <li className='py-1 duration-300 hover:scale-125'><a className="text-black cursor-pointer text-md hover:text-secondary"><Link to="/">Home</Link></a></li>
                <li className='py-1 duration-300 hover:scale-125'><a className="text-black cursor-pointer text-md hover:text-secondary"><Link to="/your-wardrobe">Your Wardrobe</Link></a></li>
                <li className='py-1 duration-300 hover:scale-125'><a className="text-black cursor-pointer text-md hover:text-secondary"><Link to="/discover">Discover</Link></a></li>
                <li className='py-1 duration-300 hover:scale-125'><a className="text-black cursor-pointer text-md hover:text-secondary"><Link to="/recommend">Recommend</Link></a></li>
            </ul>
            {!cookies.access_token ? (
            <div>
                <button className='py-3 text-xs font-semibold tracking-wide text-black rounded-full bg-background p-7 '><Link to="/login">Login</Link></button>
                <button className='py-3 text-xs font-semibold tracking-wide text-white rounded-full font-Poppins bg-primary px-7 hover:scale-110 duration 300'><Link to="/register">Sign Up</Link></button>
                
            </div>
            ) : (
              <div>
                <button onClick={() => setProfilePressed(!profilePressed)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                </button>
                
                {profilePressed ? (
                  <div>
                    <button className="flex px-3 py-2 text-sm text-gray-200 border" onClick={logout}>Logout</button>
                    <button className="flex px-3 py-2 text-sm text-gray-200 border" onClick={profile}>Profile</button>
                  </div>
                    
                    ):(<div></div>)}
                
              </div>
            )}
        </div>
        
    </nav>
  )
}

export default Navbar