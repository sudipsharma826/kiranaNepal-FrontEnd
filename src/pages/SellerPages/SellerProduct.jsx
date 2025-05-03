import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Package, Search, X, Upload, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const SellerProduct = () => {
  const { products, currency ,navigate,axios,fetchProducts} = useAppContext();

  
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleEditClick = (product) => {
    setEditProduct(product);
  };

  const handleDeleteClick = (product) => {
    setDeleteProduct(product);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();  // Prevent form from reloading the page
  
    try {
      // Create the form data object
      const formData = new FormData();
      formData.append('name', editProduct.name);
      formData.append('description', editProduct.description);
      formData.append('category', editProduct.category);
      formData.append('price', editProduct.price);
      formData.append('stock', editProduct.stock);
      formData.append('rating', editProduct.rating);
      formData.append('reviews', editProduct.reviews);
      formData.append('tags', editProduct.tags);
  
      if (editProduct.image) {
        formData.append('image', editProduct.image);
      }
  
      // Send the form data to the backend
      const response = await axios.put(
        `/api/product/update_product/${editProduct.slug}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      const { message } = response.data;
  
      if (response.data.success) {
        toast.success(message);
        setEditProduct(null);
      } else {
        toast.error(message);
      }
  
    } catch (err) {
      const message = err.response?.data?.message;
      if (err.response && err.response.status === 401) {
        toast.error(message);
      } else if (err.response && err.response.status === 500) {
        toast.error("Internal server error. Please try again later.");
      } else {
        toast.error(message);
      }
    }
  };
  

  const handleDeleteConfirm = async() => {
    try{
      const response = await axios.delete(`/api/product/delete_product/${deleteProduct.slug}`);
      const { message } = response.data;
  
      if (response.data.success) {
        toast.success(message);
        setDeleteProduct(null);
      } else {
        toast.error(message);
      }

    }catch(err){
      const message = err.response?.data?.message;
      if (err.response && err.response.status === 401) {
        toast.error(message);
      } else if (err.response && err.response.status === 500) {
        toast.error("Internal server error. Please try again later.");
      } else {
        toast.error(message);
      }
    }
  };

  const filteredProducts = products?.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    fetchProducts(); 

  }, [handleDeleteClick,handleEditClick,handleEditSubmit]); // Fetch products when the component mounts or when the edit/delete product state changes

  return (
    <div className="flex-1 flex flex-col px-4 md:px-10 py-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Package className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">All Products</h2>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative flex-grow sm:max-w-xs">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button 
          onClick={() => navigate('/seller/add_product')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors justify-center sm:justify-start"
          >
            <span className="hidden sm:inline">Add New Product</span>
            <span className="sm:hidden">Add Product</span>
          </button>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredProducts?.map((product, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="flex items-start p-4">
              <div className="w-20 h-20 overflow-hidden rounded-md border border-gray-300 bg-gray-50 flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="ml-4 flex-grow">
                <h3 className="font-medium text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-blue-600 font-semibold">{currency}{product.price}</span>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    product.stock > 10 
                      ? 'bg-green-100 text-green-800' 
                      : product.stock > 0 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 flex">
              <button
                className="flex-1 py-2 px-4 text-blue-600 hover:bg-blue-50 font-medium transition-colors"
                onClick={() => handleEditClick(product)}
              >
                Edit
              </button>
              <div className="w-px bg-gray-200"></div>
              <button
                className="flex-1 py-2 px-4 text-red-600 hover:bg-red-50 font-medium transition-colors"
                onClick={() => handleDeleteClick(product)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block w-full overflow-hidden bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700 divide-y divide-gray-200">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="py-4 px-6 text-left font-medium">Product</th>
                <th className="py-4 px-6 text-left font-medium">Category</th>
                <th className="py-4 px-6 text-left font-medium">Price</th>
                <th className="py-4 px-6 text-left font-medium">Stock</th>
                <th className="py-4 px-6 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts?.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 overflow-hidden rounded-md border border-gray-300 bg-gray-50 flex items-center justify-center flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="truncate max-w-[150px] lg:max-w-xs">
                        <p className="font-medium text-gray-800">{product.name}</p>
                        <p className="text-xs text-gray-500 truncate">{product.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-medium">{currency}{product.price}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.stock > 10 
                        ? 'bg-green-100 text-green-800' 
                        : product.stock > 0 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded font-medium hover:bg-blue-200 transition-colors"
                        onClick={() => handleEditClick(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1.5 bg-red-100 text-red-700 rounded font-medium hover:bg-red-200 transition-colors"
                        onClick={() => handleDeleteClick(product)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* No Products Message */}
      {filteredProducts?.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="mx-auto w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-4">
            <Package className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No products found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm ? `No results for "${searchTerm}"` : "You haven't added any products yet."}
          </p>
          {searchTerm ? (
            <button 
              onClick={() => setSearchTerm("")}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Clear search
            </button>
          ) : (
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              Add your first product
            </button>
          )}
        </div>
      )}

      {/* Edit Product Modal */}
      {editProduct && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Edit Product</h3>
              <button 
                onClick={() => setEditProduct(null)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="px-6 py-4">
              {/* Product Image Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors bg-gray-50">
                  <div className="space-y-1 text-center">
                    {editProduct.image ? (
                      <div className="relative mx-auto w-32 h-32">
                        <img
                          src={typeof editProduct.image === 'string' ? editProduct.image : URL.createObjectURL(editProduct.image)}
                          alt="Product preview"
                          className="object-cover w-full h-full rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => setEditProduct({ ...editProduct, image: null })}
                          className="absolute -top-2 -right-2 bg-red-100 p-1 rounded-full text-red-600 hover:bg-red-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="product-image"
                            className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="product-image"
                              name="product-image"
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={(e) => setEditProduct({ ...editProduct, image: e.target.files[0] })}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    value={editProduct.name}
                    onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                    placeholder="Name"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={editProduct.description}
                    onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                    placeholder="Description"
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={editProduct.category}
                    onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
                    placeholder="Category"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">{currency}</span>
                    </div>
                    <input
                      type="number"
                      value={editProduct.price}
                      onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                      placeholder="0.00"
                      className="w-full pl-8 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input
                    type="number"
                    value={editProduct.stock}
                    onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })}
                    placeholder="Stock"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <input
                    type="number"
                    value={editProduct.rating}
                    onChange={(e) => setEditProduct({ ...editProduct, rating: e.target.value })}
                    placeholder="Rating"
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reviews Count</label>
                  <input
                    type="number"
                    value={editProduct.reviews}
                    onChange={(e) => setEditProduct({ ...editProduct, reviews: e.target.value })}
                    placeholder="Reviews"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                  <input
                    type="text"
                    value={editProduct.tags}
                    onChange={(e) => setEditProduct({ ...editProduct, tags: e.target.value })}
                    placeholder="Tags (comma separated)"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setEditProduct(null)}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteProduct && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm animate-fade-in">
            <div className="p-6 text-center">
              <div className="w-16 h-16 mx-auto flex items-center justify-center bg-red-100 rounded-full mb-4">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Delete Product
              </h3>
              <p className="text-gray-500 mb-6">
                Are you sure you want to delete <span className="font-medium text-gray-900">{deleteProduct.name}</span>? This action cannot be undone.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setDeleteProduct(null)}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProduct;
