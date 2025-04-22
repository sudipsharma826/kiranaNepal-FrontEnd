import React from 'react';
import NavBar from './components/NavBar';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Categorie from './pages/Categorie';
import Product from './pages/Product';
import Offers from './pages/Offers';
import MyOrders from './pages/MyOrders';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Carts from './pages/Carts';
import Footer from './components/Footer';
import SingleProductPage from './pages/ProductPage';
import ProductPage from './pages/ProductPage';
import SingleCategoryPage from './pages/SingleCategoryPage';
import { Toaster } from 'react-hot-toast';

const App = () => {
  // check if the path is seller
  const isSellerPath = useLocation().pathname.includes('seller');
  
  return (
    <>
    <Toaster position="top-center" autoClose={3000} /> 
    {/* //To mounted the toaster in the app loaded so that it can be used in any page */}
      <NavBar />
      {/* Routing */}
      <div className={`${isSellerPath ? '' : 'px-6 md:px-16 lg:px-24 xl:px-32'}`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path ="/categories" element={< Categorie/>} />
          <Route path='/products' element={<Product />} />
          <Route path='/offers' element={< Offers />} />
          <Route path='/orders' element={< MyOrders />} />
          <Route path ="/login" element={<LoginPage />} />
          <Route path ="/signup" element={<SignUpPage />} />
          <Route path='/cart' element={<Carts  />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path="/category/:categoryId" element={<SingleCategoryPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
