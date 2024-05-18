import React from 'react'
import { products } from "../constants";
import  ProductCard  from "../Components/ProductCard";

function Discover() {
  return (
    <div id='products' className='flex flex-col items-center mt-24 max-container max-sm:mt-12 text-button '>
      <div className='mb-10 text-center'>
        <h2 className='text-4xl font-bold'>
          Our <span className='text-primary'> Popular </span> Products
        </h2>
        <p className='mt-2 text-gray-500 lg:max-w-lg'>
          Experience top-notch quality and style with our sought-after
          selections. Discover a world of comfort, design, and value
        </p>
      </div>

      <div className='grid grid-cols-1 mt-16 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:gap-6 gap-14'>
        {products.map((product) => (
          <ProductCard key={product.name} {...product} />
        ))}
      </div>
    </div>
  )
}

export default Discover