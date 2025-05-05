import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Filter, ChevronLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const SingleCategory = () => {
  const { products, currency, categories } = useAppContext();
  const { category } = useParams(); // this is the slug string

  // const [selectedFilters, setSelectedFilters] = useState({
  //   priceRange: '',
  //   dietary: [],
  //   brand: '',
  //   sortBy: '',
  // });

  // Find the category data by slug (safe lookup)
  const categoryData = categories.find(
    (item) => item.slug.toLowerCase() === category.toLowerCase()
  );

  // If category not found, show fallback
  if (!categoryData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-semibold text-red-600">Category Not Found</h1>
        <p className="mt-2 text-gray-600">
          Please check the URL or return to the categories page.
        </p>
        <Link to="/categories" className="text-green-600 underline mt-4 block">
          ← Back to Categories
        </Link>
      </div>
    );
  }

  // Filter products by matching product.category to categoryData.name
  const filteredProducts = products.filter(
    (product) =>
      product.category &&
      product.category.toLowerCase() === categoryData.name.toLowerCase()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 mb-8">
        <Link to="/" className="text-primary hover:text-primary-dull flex items-center">
          <ChevronLeft className="h-5 w-5" />
          <span>Home</span>
        </Link>
        <Link to="/categories" className="text-primary hover:text-primary-dull flex items-center">
          <ChevronLeft className="h-5 w-5" />
          <span>All Categories</span>
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-600">{categoryData.name}</span>
      </div>

      {/* Category Header */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="relative h-64">
          <img
            src={categoryData.image}
            alt={categoryData.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-6 text-white">
              <h1 className="text-3xl font-bold mb-2">{categoryData.name}</h1>
              <p className="text-gray-200">{categoryData.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      {/* <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
        <div className="flex items-center flex-wrap gap-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <Filter className="h-5 w-5" />
            <span className="font-medium">Filters:</span>
          </div> */}
          {/* Price Range Filter */}
          {/* <select
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white"
            value={selectedFilters.priceRange}
            onChange={(e) =>
              setSelectedFilters({ ...selectedFilters, priceRange: e.target.value })
            }
          >
            <option value="">Price Range</option>
            <option value="0-50">$0 - $50</option>
            <option value="51-100">$51 - $100</option>
            <option value="101+">$101+</option>
          </select> */}
          {/* Brand Filter */}
          {/* <select
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white"
            value={selectedFilters.brand}
            onChange={(e) =>
              setSelectedFilters({ ...selectedFilters, brand: e.target.value })
            }
          >
            <option value="">Brand</option>
            <option value="organic">Organic</option>
            <option value="local">Local Farms</option>
            <option value="premium">Premium</option>
          </select> */}
          {/* Sort Filter */}
          {/* <select
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white"
            value={selectedFilters.sortBy}
            onChange={(e) =>
              setSelectedFilters({ ...selectedFilters, sortBy: e.target.value })
            }
          >
            <option value="">Sort By</option>
            <option value="popular">Most Popular</option>
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div> */}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.category.toLowerCase()}/${product.id}`}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                </div>
                <p className="text-lg font-bold text-gray-900 mt-2">
                  {currency}
                  {product.price}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No products found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default SingleCategory;
