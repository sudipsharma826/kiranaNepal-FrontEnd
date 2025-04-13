import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ShoppingBag } from 'lucide-react';

const MainBanner = () => {
  return (
    <div className='relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-2xl shadow-xl'>
      {/* Background Image */}
      <img 
        src="/assets/main_banner_bg.png" 
        alt="Kirana Nepal Store" 
        className="w-full h-full object-cover transform scale-105 animate-slow-zoom hidden md:block"
      />
      <img 
        src="/assets/main_banner_bg_sm.png" 
        alt="Kirana Nepal Store" 
        className="w-full h-full object-cover transform scale-105 animate-slow-zoom block md:hidden" 
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>

      {/* Content */}
      <div className='absolute inset-0 flex flex-col justify-center items-center px-6 md:px-16'>
        <div className='max-w-4xl mx-auto text-center relative z-10'>
          <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight'>
            Welcome to{' '}
            <span className='text-red-500 animate-pulse'>Kirana</span>{' '}
            <span className='text-blue-400'>Nepal</span>
          </h1>
          <p className='text-lg md:text-xl lg:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed'>
            Your one-stop destination for authentic Nepali groceries and essentials
          </p>
          <Link
            to="/products"
            className='group inline-flex items-center gap-3 px-8 py-4 bg-red-500 hover:bg-red-600 
                     transition-all duration-300 text-white rounded-full text-lg font-medium 
                     shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-1'
          >
            <span>Shop Now</span>
            <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </Link>
          <div className='absolute -bottom-14 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce'>
            <span className='text-white text-sm'>Scroll Down</span>
            <ArrowDown className='w-6 h-6 text-white opacity-75 animate-bounce' />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;