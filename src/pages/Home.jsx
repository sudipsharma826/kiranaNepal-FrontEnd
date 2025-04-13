import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categorie'
import Products from '../components/Product'
import Newsletter from '../components/NewsLetter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
    <div className='mt-12'>
     <MainBanner />
    </div>
    <Categories />
    <Products />
    <Newsletter />
    <div className='mt-12'>
    <Footer />
    </div>
    </>
  )
}

export default Home