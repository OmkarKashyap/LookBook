import { useState } from "react";
import {Link} from 'react-router-dom'
import { home, statistics } from "../constants";
import Button from "../Components/Button";
import HomeCard from "../Components/HomeCard";
import fashion3_homepage from "../assets/images2/fashion3_homepage.jpg";
import { arrowRight } from "../assets/icons";

const Hero = () => {
  const [bigHomeImg, setBigHomeImg] = useState(fashion3_homepage);

  return (
    <section
      id='home'
      className='flex flex-col justify-center w-full min-h-screen gap-10 bg-background xl:flex-row max-container'
    >
      <div className='relative flex flex-col items-start justify-center w-full bg-background xl:w-2/5 max-xl:padding-x pt-28'>
        

        <h1 className='mt-10 font-palanquin text-8xl  max-sm:text-[72px] max-sm:leading-[82px] font-bold'>
          <span className='relative z-10 pr-10 xl:bg-background xl:whitespace-nowrap'>
            Welcome to the
          </span>
          <br />
          <span className='inline-block mt-3 text-primary'>LookBook</span> 
        </h1>
        <p className='mt-6 text-xl leading-8 font-montserrat text-slate-gray mb-14 sm:max-w-sm'>
        Discover your unique style and shop for clothes based on minimalistic styling methods while also organizing your wardrobe
        </p>

        <Link to='/discover'><Button label='Shop now' iconURL={arrowRight} /></Link>

        <div className='flex flex-wrap items-start justify-start w-full gap-16 mt-20 '>
          {statistics.map((stat, index) => (
            <div key={index}>
              <p className='text-4xl font-bold font-palanquin'>{stat.value}</p>
              <p className='leading-7 font-montserrat text-slate-gray'>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className='relative z-0 flex items-center justify-center flex-1 bg-center bg-cover xl:min-h-screen max-xl:py-40 bg-hero'> 
        <img
          src={bigHomeImg}
          alt='home colletion'
          width={610}
          height={502}
          className='relative z-10 object-cover w-full h-full rounded-xl'
        />

        <div className='z-10 flex sm:gap-6 gap-4 absolute -bottom-[5%] sm:left-[10%] max-sm:px-6'>
          {home.map((image, index) => (
            <div key={index} className="">
              <HomeCard
                index={index}
                imgURL={image}
                changeBigHomeImage={(home) => setBigHomeImg(home)}
                bigHomeImg={bigHomeImg}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;