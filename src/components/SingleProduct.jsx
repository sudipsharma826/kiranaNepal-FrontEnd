import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, Minus, Plus, Star, ShoppingCart, Heart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

function SingleProductPage() {
  const { id } = useParams();
  const { products, addToCart, removeFromCart, cartItems,currency } = useAppContext();
  const productData = products.find((product) => String(product.id) === String(id));

  const [quantity, setQuantity] = useState(0);

  // Set initial quantity from cartItems
  useEffect(() => {
    if (productData && cartItems) {
      setQuantity(cartItems[productData.id] || 0);
    }
  }, [productData, cartItems]);

  if (!productData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-700">
        <h2 className="text-2xl font-semibold">Product not found</h2>
        <p className="mt-2">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/categories" className="mt-4 inline-block text-green-600 hover:underline">
          Back to Categories
        </Link>
      </div>
    );
  }

  const relatedProducts = products.filter(
    (product) =>
      product.category.toLowerCase() === productData.category.toLowerCase() &&
      product.id !== productData.id
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
              <span className="text-gray-600">{productData.name}</span>
            </div>

      {/* Product Details */}
      <div className="bg-white rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        {/* Product Image */}
        <div className="h-96 rounded-xl overflow-hidden">
          <img
            src={productData.image}
            alt={productData.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{productData.name}</h1>
            <p className="text-green-600 mt-1 text-sm font-medium">{productData.category}</p>
          </div>

          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(productData.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-gray-500 text-sm">({productData.reviews} reviews)</span>
          </div>

          <p className="text-gray-700 leading-relaxed">{productData.description}</p>

          <div className="text-3xl font-bold text-gray-900">{currency}{productData.price}</div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 font-medium">Quantity:</span>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={() => removeFromCart(productData.id)}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-6 py-2">{quantity}</span>
              <button
                onClick={() => addToCart(productData)}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <span className="text-sm text-gray-500">({productData.stock} available)</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => addToCart(productData)}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
            <button className="flex items-center justify-center border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-100">
              <Heart className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts?.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.category}/${product.id}`}
                className="bg-white rounded-xl shadow hover:shadow-md transition-shadow"
              >
                <div className="h-48 w-full overflow-hidden rounded-t-xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                  <div className="mt-2 font-bold text-green-700">{currency}{product.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default SingleProductPage;
