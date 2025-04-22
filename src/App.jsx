import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Categorie from './pages/Categorie';
import Product from './pages/Product';
import Offers from './pages/Offers';
import MyOrders from './pages/MyOrders';
import Carts from './pages/Carts';
import Footer from './components/Footer';
import ProductPage from './pages/ProductPage';
import SingleCategoryPage from './pages/SingleCategoryPage';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './components/ScrollToTop';
import { useAppContext } from './context/AppContext';
import Login from './components/Login';

const App = () => {
  const location = useLocation();
  const isSellerPath = location.pathname.includes('seller');
  const { showUserLogin ,setShowUserLogin} = useAppContext();

  console.log("showUserLogin in App.jsx:", showUserLogin); // Log the state here to check if it's being updated

  return (
    <>
      {showUserLogin && <Login onClose={()=>{
        setShowUserLogin(false);
      }} />}
      <Toaster position="top-center" reverseOrder={false} />

      <NavBar />
      
      <div className={`${isSellerPath ? '' : 'px-6 md:px-16 lg:px-24 xl:px-32'}`}>
        <ScrollToTop />
        
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/categories' element={<Categorie />} />
          <Route path='/products' element={<Product />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/orders' element={<MyOrders />} />
          <Route path='/cart' element={<Carts />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='/category/:categoryId' element={<SingleCategoryPage />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
