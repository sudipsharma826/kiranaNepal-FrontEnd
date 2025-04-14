import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, Minus, Plus, Star, ShoppingCart, Heart } from 'lucide-react';

// Mock data - replace with API data
const productData = {
  id: 1,
  name: 'Organic Bananas',
  price: 2.99,
  description: 'Fresh organic bananas sourced directly from eco-friendly farms. Perfect ripeness and great for smoothies, baking, or healthy snacking.',
  category: 'Fresh Produce',
  image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=600',
  rating: 4.5,
  reviews: 128,
  stock: 50,
  nutrition: {
    calories: '89kcal',
    protein: '1.1g',
    carbs: '22.8g',
    fat: '0.3g'
  },
  relatedProducts: [
    {
      id: 2,
      name: 'Fresh Apples',
      price: 1.99,
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 3,
      name: 'Organic Avocados',
      price: 3.99,
      image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=600'
    }
  ]
};

function SingleProductPage() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < productData.stock) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 mb-8">
        <Link to="/categories" className="text-green-600 hover:text-green-700 flex items-center">
          <ChevronLeft className="h-5 w-5" />
          <span>Back to Categories</span>
        </Link>
      </div>

      {/* Product Details */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* Product Image */}
          <div className="relative h-96">
            <img 
              src={productData.image}
              alt={productData.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{productData.name}</h1>
              <p className="text-green-600 mt-1">{productData.category}</p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(productData.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-500">({productData.reviews} reviews)</span>
            </div>

            <p className="text-gray-600">{productData.description}</p>

            <div className="text-3xl font-bold text-gray-900">${productData.price.toFixed(2)}</div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={decreaseQuantity}
                  className="p-2 hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="p-2 hover:bg-gray-100"
                  disabled={quantity >= productData.stock}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="text-gray-500">{productData.stock} available</span>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-green-700 transition-colors">
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Heart className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Nutrition Information */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Nutrition Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Calories</p>
                  <p className="font-semibold">{productData.nutrition.calories}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Protein</p>
                  <p className="font-semibold">{productData.nutrition.protein}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Carbohydrates</p>
                  <p className="font-semibold">{productData.nutrition.carbs}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Fat</p>
                  <p className="font-semibold">{productData.nutrition.fat}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productData.relatedProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
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
                <p className="text-lg font-bold text-gray-900 mt-2">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default SingleProductPage;