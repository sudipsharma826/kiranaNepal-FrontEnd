import React from 'react';
import { BadgePercent, Flame, Sparkles } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

// const demoOffers = [
//   {
//     id: 1,
//     title: 'Flat 20% Off on First Order',
//     description: 'Use coupon code NEW20 and enjoy 20% off on your first order!',
//     code: 'NEW20',
//     image: 'https://source.unsplash.com/400x300/?burger',
//   },
//   {
//     id: 2,
//     title: 'Free Delivery on Orders Above Rs.1000',
//     description: 'Enjoy free home delivery when you order above Rs.1000.',
//     code: 'FREESHIP',
//     image: 'https://source.unsplash.com/400x300/?pizza',
//   },
//   {
//     id: 3,
//     title: 'BOGO Pizza Fest',
//     description: 'Buy One Get One Free on all pizzas. Valid every Friday!',
//     code: 'BOGOPIZZA',
//     image: 'https://source.unsplash.com/400x300/?food,deal',
//   },
// ];

const OffersDeals = () => {
  const {navigate}= useAppContext();
  return (
    <div className="bg-gradient-to-br from-orange-50 to-yellow-100 min-h-screen py-10 px-6 sm:px-12 lg:px-20">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10 flex items-center justify-center gap-2">
        <BadgePercent className="text-orange-500" /> Today’s Best Offers & Deals
      </h1>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {demoOffers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
          >
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 space-y-3">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Sparkles className="text-yellow-500" /> {offer.title}
              </h2>
              <p className="text-gray-600">{offer.description}</p>

              <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md inline-block text-sm font-medium shadow-sm">
                Coupon Code: <span className="font-bold">{offer.code}</span>
              </div>

              <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition-colors">
                Apply Coupon
              </button>
            </div>
          </div>
        ))}
      </div> */}

      {/* Extra Discount Section */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-3 flex justify-center items-center gap-2">
          <Flame className="text-red-500" /> Mega Offer Are Coming Soon!
        </h2>
        {/* <p className="text-gray-600 mb-6">Get up to <span className="font-bold text-orange-600">50% OFF</span> on selected restaurants. No coupon required.</p> */}
        <button 
        onClick={()=> navigate('/products')}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full text-lg shadow-md transition">
          Explore Products
        </button>
      </div>
    </div>
  );
};

export default OffersDeals;
