import React from 'react';
import { star } from "../assets/icons";

function ProductCard({ imgURL, name, price }) {
  return (
    <div className='flex flex-col flex-1 w-full max-sm:w-full'>
      <img src={imgURL} alt={name} className='w-[282px] h-[282px] rounded-2xl' />
      <div className='mt-8 flex justify-start gap-2.5'>
        <img src={star} alt='rating icon' width={24} height={24} />
        <p className='text-xl leading-normal font-montserrat text-slate-gray'>
          (4.5)
        </p>
      </div>
      <h3 className='mt-2 text-2xl font-semibold leading-normal text-black font-palanquin'>
        {name}
      </h3>
      <p className='mt-2 text-2xl font-semibold leading-normal font-montserrat text-primary'>
        {price}
      </p>
    </div>
  );
}

export default ProductCard; 
