import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Button from "../Components/Button";
import HomeCard from "../Components/HomeCard";
import frontPage1 from "../assets/FrontPage1.jpg";
import { arrowRight } from "../assets/icons";

const Hero = () => {
  const [bigHomeImg, setBigHomeImg] = useState(frontPage1);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Set showBanner to true after a delay
    const timeout = setTimeout(() => {
      setShowBanner(true);
    }, 1000); // Adjust delay as needed

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      id='home'
      className='flex justify-between w-full min-h-screen pl-6 bg-background max-container'
    >
      <div className='flex flex-col justify-center w-3/5 bg-background max-xl:padding-x pt-28'>
        <h1 className='mt-8 font-palanquin text-8xl max-sm:text-[72px] max-sm:leading-[82px] font-bold'>
          <span className='relative z-10 pr-10 xl:bg-background xl:whitespace-nowrap'>
            Welcome to
          </span>
          <br />
          <span className='inline-block mt-3 ml-10 text-primary'>Navyatha</span> 
        </h1>
        <p className='mt-6 mb-10 text-xl leading-8 font-montserrat text-slate-gray sm:max-w-md'>
          Discover your unique style and shop for clothes based on minimalistic styling methods while also organizing your wardrobe
        </p>
        <div className={`transition-transform duration-5000 pb-4 transform ${showBanner ? 'translate-x-0' : 'translate-x-full'} ${showBanner ? '' : 'hidden'}`} style={{ maxWidth: 'fit-content' }}>
  <span className="inline-block px-4 py-2 text-white bg-red-500 rounded-lg shadow-md">
    Ugadi Sale almost ends! Hurry and buy clothes fast!!!
  </span>
</div>




        <Link to='/discover'><Button label='Shop now' iconURL={arrowRight} /></Link>
      </div>
      <div className='relative flex flex-col justify-center w-3/5 min-h-screen bg-center bg-cover bg-hero'>
        <div className='absolute bottom-0 flex gap-4 left-10 max-sm:px-6'>
          {/* {home.map((image, index) => (
            <div key={index}>
              <HomeCard
                index={index}
                imgURL={image}
                changeBigHomeImage={(home) => setBigHomeImg(home)}
                bigHomeImg={bigHomeImg}
              />
            </div>
          ))} */}
        </div>
        
        <img
          src={frontPage1}
          alt='home collection'
          className='object-cover w-full max-h-[100vh] rounded-xl object-top' 
        />
      </div>
    </section>
  );
};

export default Hero;
