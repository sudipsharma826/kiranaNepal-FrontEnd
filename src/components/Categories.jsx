import React, { useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Categories = () => {
  const { navigate, categories, fetchCategories } = useAppContext();

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Shop by Category
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover essentials from electronics to groceries – all in one place.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div
            key={category._id}
            className="group relative overflow-hidden rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gray-900"
          >
            {/* Background Image with Dark Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-opacity duration-300"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-6 md:p-8 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center mb-4">
                  <img
                    src={category.icon}
                    alt="Category Icon"
                    className="w-10 h-10 rounded-full border-2 border-white mr-3"
                  />
                  <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                </div>
                <p className="text-white/90 mt-2 text-sm leading-relaxed">
                  {category.description || 'No description available.'}
                </p>
                <p className="text-white/70 mt-2 text-xs">
                  Total Products: <span className="font-semibold">{category.totalproducts}</span>
                </p>
              </div>
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={() => navigate(`/category/${category.slug}`)}
                  className="cursor-pointer w-full px-6 py-2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-lg rounded-full font-medium text-sm transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100"
                >
                  Explore Category
                </button>
                <ChevronRight className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-2 transition-all duration-300 ml-2" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Section */}
      <div className="max-w-7xl mx-auto mt-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Not sure where to start?
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                Let us help you with personalized shopping suggestions tailored to your needs.
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold shadow-md hover:shadow-orange-500/40 transition-all duration-300 transform hover:-translate-y-1">
                Get Recommendations
              </button>
            </div>
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
              <img
                src="/assets/shopping_banner.jpg"
                alt="Shopping"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
