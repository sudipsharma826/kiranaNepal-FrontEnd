import React from 'react';
import NavBar from './components/NavBar';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';

const App = () => {
  // check if the path is seller
  const isSellerPath = useLocation().pathname.includes('seller');

  return (
    <>
      <NavBar />
      {/* Routing */}
      <div className={`${isSellerPath ? '' : 'px-6 md:px-16 lg:px-24 xl:px-32'}`}>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
