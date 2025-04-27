import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    category: '',
    productPrice: '',
   
    image: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      category: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Post data to backend here
    navigate('/products'); // Redirect after submission
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white py-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-10 space-y-8 w-full max-w-2xl border"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Add New Product</h2>

        {/* Product Image Upload */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-lg font-semibold text-gray-700">Product Image</p>
          <label className="cursor-pointer">
            <input
              accept="image/*"
              type="file"
              hidden
              onChange={handleImageChange}
            />
            <img
              src={
                formData.image
                  ? formData.image
                  : "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
              }
              alt="Upload"
              className="w-32 h-32 object-cover rounded-lg border-2 border-dashed border-gray-400 hover:border-indigo-400 transition"
            />
          </label>
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium" htmlFor="productName">Product Name</label>
          <input
            id="productName"
            type="text"
            placeholder="Enter product name"
            value={formData.productName}
            onChange={handleChange}
            className="outline-none py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium" htmlFor="productDescription">Product Description</label>
          <textarea
            id="productDescription"
            rows={4}
            placeholder="Enter product description"
            value={formData.productDescription}
            onChange={handleChange}
            className="outline-none py-3 px-4 rounded-lg border border-gray-300 resize-none focus:ring-2 focus:ring-indigo-400"
            required
          ></textarea>
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium" htmlFor="category">Category</label>
          <select
            id="category"
            value={formData.category}
            onChange={handleCategoryChange}
            className="outline-none py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
            required
          >
            <option value="">Select Category</option>
            {[
              { name: 'Electronics' },
              { name: 'Clothing' },
              { name: 'Accessories' }
            ].map((item, index) => (
              <option key={index} value={item.name}>{item.name}</option>
            ))}
          </select>
        </div>

        {/* Price
         and Offer Price */}
        <div className="flex gap-6">
          <div className="flex flex-col gap-2 w-1/2">
            <label className="text-lg font-medium" htmlFor="productPrice">Product Price ($)</label>
            <input
              id="productPrice"
              type="number"
              placeholder="0"
              value={formData.productPrice}
              onChange={handleChange}
              className="outline-none py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 transition text-white text-lg font-semibold rounded-xl"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
