import React from 'react';
import { Star, ShoppingCart, Heart, ChevronDown } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Nepali Momo Platter',
    category: 'Main Course',
    price: 12.99,
    rating: 4.8,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=1000',
    description: 'Authentic Nepali dumplings served with special sauce and soup',
    tags: ['Bestseller', 'Spicy']
  },
  {
    id: 2,
    name: 'Butter Chicken',
    category: 'Main Course',
    price: 15.99,
    rating: 4.9,
    reviews: 256,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=1000',
    description: 'Creamy, rich butter chicken with naan bread',
    tags: ['Popular', 'Creamy']
  },
  {
    id: 3,
    name: 'Thukpa Noodle Soup',
    category: 'Soups',
    price: 10.99,
    rating: 4.7,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&q=80&w=1000',
    description: 'Himalayan style noodle soup with vegetables',
    tags: ['Vegetarian', 'Healthy']
  },
  {
    id: 4,
    name: 'Gulab Jamun',
    category: 'Desserts',
    price: 6.99,
    rating: 4.9,
    reviews: 167,
    image: 'https://images.unsplash.com/photo-1605195340154-11ed59a83c90?auto=format&fit=crop&q=80&w=1000',
    description: 'Sweet milk dumplings in rose syrup',
    tags: ['Sweet', 'Dessert']
  },
  {
    id: 5,
    name: 'Masala Dosa',
    category: 'Breakfast',
    price: 11.99,
    rating: 4.8,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&q=80&w=1000',
    description: 'Crispy rice crepe filled with spiced potatoes',
    tags: ['Vegetarian', 'Spicy']
  }
];

const Products = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h1>
            <p className="text-gray-600">Discover our most popular dishes</p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
              Category <ChevronDown className="w-4 h-4" />
            </button>
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
              Price Range <ChevronDown className="w-4 h-4" />
            </button>
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
              Dietary <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group">
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors">
                  <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
                </button>
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 shadow-lg ml-2 first:ml-0"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <p className="text-xl font-bold text-indigo-600">${product.price}</p>
                </div>

                <p className="text-gray-600 text-sm mb-4">{product.description}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                  <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors group">
                  <ShoppingCart className="w-5 h-5 group-hover:animate-bounce" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-white border-2 border-gray-200 rounded-full text-gray-700 font-medium hover:bg-gray-50 transition-colors">
            Load More Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;