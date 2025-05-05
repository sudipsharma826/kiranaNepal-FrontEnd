import React from 'react'
import SingleProductPage from '../components/SingleProduct'
import AdSpaceContainer from '../components/AdsSense'

const ProductPage = () => {
  return (

    <div className='mt-20'>
        < SingleProductPage />
        <AdSpaceContainer className="mt-12" />
    </div>
  )
}

export default ProductPage