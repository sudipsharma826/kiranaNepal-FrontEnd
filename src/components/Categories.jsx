import React from 'react';
import { ChevronRight, Utensils, Coffee, Pizza, Sandwich, Beef, Fish, Salad, IceCream, Soup } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: 'Main Course',
    description: 'Hearty and filling dishes for your main meal',
    icon: Utensils,
    items: 86,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 2,
    name: 'Beverages',
    description: 'Refreshing drinks and cocktails',
    icon: Coffee,
    items: 45,
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&q=80&w=1000',
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 3,
    name: 'Pizza',
    description: 'Classic and gourmet pizza varieties',
    icon: Pizza,
    items: 32,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1000',
    color: 'from-red-500 to-pink-500'
  },
  {
    id: 4,
    name: 'Sandwiches',
    description: 'Fresh and tasty sandwich options',
    icon: Sandwich,
    items: 28,
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&q=80&w=1000',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 5,
    name: 'Meat',
    description: 'Premium quality meat dishes',
    icon: Beef,
    items: 54,
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=1000',
    color: 'from-red-600 to-red-800'
  },
  {
    id: 6,
    name: 'Seafood',
    description: 'Fresh seafood specialties',
    icon: Fish,
    items: 41,
    image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&q=80&w=1000',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    id: 7,
    name: 'Salads',
    description: 'Healthy and fresh salad options',
    icon: Salad,
    items: 25,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 8,
    name: 'Desserts',
    description: 'Sweet treats and desserts',
    icon: IceCream,
    items: 38,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=1000',
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 9,
    name: 'Soups',
    description: 'Warm and comforting soups',
    icon: Soup,
    items: 19,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=1000',
    color: 'from-amber-500 to-yellow-500'
  }
];

const Categories = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Food Categories
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our wide range of delicious food categories, from hearty main courses to sweet desserts
        </p>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Background Image with Gradient */}
            <div className="absolute inset-0">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80 group-hover:opacity-90 transition-opacity duration-300`}></div>
            </div>

            {/* Content */}
            <div className="relative p-8">
              <div className="flex items-start justify-between">
                <div>
                  <category.icon className="w-8 h-8 text-white mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-white/90 mb-4">{category.description}</p>
                  <span className="text-white/80 text-sm">{category.items} items</span>
                </div>
                <ChevronRight className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300" />
              </div>

              {/* Hover Effect Button */}
              <button className="mt-6 px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full text-sm font-medium backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                Explore Category
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Section */}
      <div className="max-w-7xl mx-auto mt-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Can't decide what to eat?
              </h2>
              <p className="text-gray-600 mb-6">
                Try our personalized food recommendation system based on your taste preferences and dietary requirements.
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-0.5">
                Get Recommendations
              </button>
            </div>
            <div className="relative h-64 md:h-auto">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000"
                alt="Featured Food"
                className="w-full h-full object-cover rounded-xl shadow-md"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;