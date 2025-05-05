import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import FeaturedProducts from '../components/FeatureProduct'
import Newsletter from '../components/NewsLetter'
import AdSpaceContainer from '../components/AdsSense'


const Home = () => {
  return (
    <>
    <div className='mt-22'>
     <MainBanner />
    </div>
    <Categories />
    <FeaturedProducts />

    <Newsletter />
    <AdSpaceContainer className="mt-12" />
    <div className='mt-12'>
    </div>
    </>
  )
}

export default Home