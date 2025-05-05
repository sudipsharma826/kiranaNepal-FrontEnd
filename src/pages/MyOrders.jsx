import React from 'react'
import MyOrder from '../components/MyOrder'
import AdSpaceContainer from '../components/AdsSense'

const MyOrders = () => {
  return (
    <div className='mt-20'>
        <MyOrder />
        <AdSpaceContainer className="mt-12" />
    </div>
  )
}

export default MyOrders