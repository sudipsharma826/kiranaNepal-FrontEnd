import React from 'react'
import SingleCategory from '../components/SingleCategory'
import AdSpaceContainer from '../components/AdsSense'

const SingleCategoryPage = () => {
  return (
    <div className='mt-20'>
        <SingleCategory />
        <AdSpaceContainer className="mt-12" />
    </div>
  )
}

export default SingleCategoryPage