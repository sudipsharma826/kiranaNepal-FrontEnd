import React from 'react'
import CartPage from '../components/Cart'
import AdSpaceContainer from '../components/AdsSense'

const Carts = () => {
  return (
    <div className='mt-20'>
        <CartPage />
        <AdSpaceContainer className="mt-12" />
    </div>
  )
}

export default Carts