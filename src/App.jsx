import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import AddAddressPage from './pages/AddAddressPage';
import SellerLogin from './components/SellerComponents/SellerLogin';
import LayoutSeller from './pages/SellerPages/LayoutSeller';
import AddProduct from './pages/SellerPages/AddProduct';
import SellerProduct from './pages/SellerPages/SellerProduct';
import SellerOrders from './pages/SellerPages/SellerOrders';
import SellerCategories from './pages/SellerPages/SellerCategories';
const App = () => {
  const location = useLocation();
  const isSellerPath = location.pathname.includes('seller');
  const { showUserLogin, setShowUserLogin, isSeller, user } = useAppContext();



  return (
    <>
      {showUserLogin && (
        <Login onClose={() => setShowUserLogin(false)} />
      )}
      <Toaster position="top-center" reverseOrder={false} />

      {!isSellerPath && <NavBar />}

      <div className={`${isSellerPath ? '' : 'px-6 md:px-16 lg:px-24 xl:px-32'}`}>
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categorie />} />
          <Route path="/products" element={<Product />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/cart" element={<Carts />} />
          <Route path="/product/:category/:id" element={<ProductPage />} />
          <Route path="/category/:category" element={<SingleCategoryPage />} />
          <Route path="/add_address" element={<AddAddressPage />} />

          {/* Seller Routes */}
          <Route path="/seller" element={isSeller ? <LayoutSeller /> : <SellerLogin />}>
            <Route index element={<SellerProduct />} />
            <Route path="add_product" element={<AddProduct />} />
            <Route path="orders" element={<SellerOrders />} />
            <Route path="categories" element={<SellerCategories />} />
          </Route>
        </Routes>
      </div>

      {!isSellerPath && <Footer />}
    </>
  );
};

export default App;
