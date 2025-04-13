import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ShoppingBag } from 'lucide-react';

const MainBanner = () => {
  return (
    <div className='relative w-full h-[300px] md:h-[400px] overflow-hidden'>
      {/* Background Image */}
      <img 
        src="/assets/main_banner_bg.png" 
        alt="Kirana Nepal Store" 
        className="w-full h-full object-cover transform scale-105 animate-slow-zoom"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>

      {/* Content Container */}
      <div className='absolute inset-0 flex flex-col justify-center items-center px-6 md:px-16'>
        <div className='max-w-4xl mx-auto text-center relative z-10'>
          {/* Main Heading */}
          <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 tracking-tight'>
            Welcome to{' '}
            <span className='text-red-500 animate-pulse'>Kirana</span>{' '}
            <span className='text-blue-400'>Nepal</span>
          </h1>
          
          {/* Subheading */}
          <p className='text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed'>
            Your one-stop destination for authentic Nepali groceries and essentials
          </p>

          {/* CTA Button */}
        {/* Scroll Indicator */}
        <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce'>
        
          <ArrowDown className='w-6 h-20 text-primary' />
        </div>
          <Link
            to="/products"
            className='group inline-flex items-center gap-2 px-8 py-4 bg-red-500 hover:bg-red-600 
                     transition-all duration-300 text-white rounded-full text-lg font-medium 
                     shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-1'
          >
            <span>Shop Now</span>
            <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default MainBanner;