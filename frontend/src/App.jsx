import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './Pages/Home'
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Navbar from './Components/Navbar'
import YourWardrobe from './Pages/YourWardrobe'
import Discover from './Pages/Discover'
import Hero from './Pages/Hero'
import Recommender from './Pages/Recommender'
function App() {
  return (
    <div> 
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/your-wardrobe" element={<YourWardrobe />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/recommend" element={<Recommender />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App



