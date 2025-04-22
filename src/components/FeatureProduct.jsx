import React from 'react';
import { Star, ShoppingCart, Heart, ChevronDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const FeaturedProducts = () => {
  
  const { products,currency, cartItems, addToCart, removeFromCart,navigate } = useAppContext();
  

  return (
    <div  className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-3">🔥 Featured Essentials</h1>
            <p className="text-gray-600 text-lg">Discover top-rated picks tailored just for you</p>
          </div>
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mt-6 md:mt-0">
            {['Category', 'Price Range', 'Brand'].map((filter, idx) => (
              <button
                key={idx}
                className="px-5 py-2 bg-white border border-gray-300 rounded-full text-sm font-semibold text-gray-700 hover:bg-primary/10 hover:text-primary flex items-center gap-2 transition-all"
              >
                {filter} <ChevronDown className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0,6).map((product) => {
            const inCart = cartItems[product.id] || 0;

            return (
              <div
                
                key={product.id}
                className=" bg-white rounded-3xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500"
              >
                <div 
                onClick={() => navigate(`/product/${product.slug}`)}
                className=" cursor-pointer relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-md hover:bg-white">
                    <Heart className="w-5 h-5 text-gray-500 group-hover:text-red-500" />
                  </button>
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="absolute top-4 left-4 px-3 py-1 bg-primary/80 text-white rounded-full text-xs font-semibold shadow-md ml-2 first:ml-0"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 leading-snug">{product.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                    </div>
                    <p className="text-lg font-bold text-primary">{currency} {product.price}</p>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>

                  <div className="flex items-center gap-2 mb-5">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                  </div>

                  {inCart === 0 ? (
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all"
                    >
                      <ShoppingCart className="w-5 h-5" /> Add to Cart
                    </button>
                  ) : (
                    <div className="flex justify-center items-center gap-3 bg-primary/10 rounded-full px-4 py-2">
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-primary font-bold text-lg"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-semibold">{inCart}</span>
                      <button
                        onClick={() => addToCart(product)}
                        className="text-primary font-bold text-lg"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More */}
        <div className="text-center mt-16">
          <button onClick={()=>
            navigate("/products")
          }          className=" cursor-pointer px-8 py-3 bg-primary text-white rounded-full font-semibold shadow hover:bg-primary/90 transition-all">
            Load More Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;