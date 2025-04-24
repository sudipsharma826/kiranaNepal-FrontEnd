import React from 'react';
import FeaturedProducts from '../components/FeatureProduct';
import { useAppContext } from '../context/AppContext';
import Products from '../components/Products';
import { useLocation } from 'react-router-dom';

const ProductsPage = () => {
  const { pathname } = useLocation();
  const { products } = useAppContext();

  const inHome = pathname === '/';
  console.log(products);

  return (
    <div className='mt-20'>
      {inHome && <FeaturedProducts />}
      <Products />
    </div>
  );
};

export default ProductsPage;
