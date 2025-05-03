import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { FolderIcon, Search, X, Upload, AlertCircle, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const SellerCategories = () => {
  const { navigate, axios } = useAppContext();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCategory, setEditCategory] = useState(null);
  const [deleteCategory, setDeleteCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/category/get_categories');
      if (response.data.success) {
        setCategories(response.data.data);
        console.log('Fetched categories:', response.data.data);
      } else {
        toast.error(response.data.message || 'Failed to fetch categories');
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      toast.error('Failed to load categories. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (category) => {
    setEditCategory(category);
  };

  const handleDeleteClick = (category) => {
    setDeleteCategory(category);
  };

  const handleAddSubmit = async (formData) => {
    try {
      const response = await axios.post(
        '/api/category/add_category',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || 'Category added successfully');
        setShowAddForm(false);
        fetchCategories();
      } else {
        toast.error(response.data.message || 'Failed to add category');
      }
    } catch (err) {
      handleError(err);
    }
  };

  const handleEditSubmit = async (formData, slug) => {
    try {
      const response = await axios.put(
        `/api/category/update_category/${slug}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || 'Category updated successfully');
        setEditCategory(null);
        fetchCategories();
      } else {
        toast.error(response.data.message || 'Failed to update category');
      }
    } catch (err) {
      handleError(err);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`/api/category/delete_category/${deleteCategory.slug}`);
      
      if (response.data.success) {
        toast.success(response.data.message || 'Category deleted successfully');
        setDeleteCategory(null);
        fetchCategories();
      } else {
        toast.error(response.data.message || 'Failed to delete category');
      }
    } catch (err) {
      handleError(err);
    }
  };

  const handleError = (err) => {
    const message = err.response?.data?.message;
    if (err.response && err.response.status === 401) {
      toast.error(message || 'Unauthorized access');
    } else if (err.response && err.response.status === 500) {
      toast.error("Internal server error. Please try again later.");
    } else {
      toast.error(message || 'An error occurred. Please try again.');
    }
  };

  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Category Form Component
  const CategoryForm = ({ category, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
      name: category?.name || '',
      description: category?.description || '',
      image: null,
      icon: null
    });

    const [imagePreview, setImagePreview] = useState(category?.image || null);
    const [iconPreview, setIconPreview] = useState(category?.icon || null);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
      
      if (errors[name]) {
        setErrors({
          ...errors,
          [name]: ''
        });
      }
    };

    const handleImageChange = (e, type) => {
      const file = e.target.files[0];
      if (!file) return;

      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setErrors({
          ...errors,
          [type]: 'Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.'
        });
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setErrors({
          ...errors,
          [type]: 'File is too large. Maximum size is 10MB.'
        });
        return;
      }

      setFormData({
        ...formData,
        [type]: file
      });

      const reader = new FileReader();
      reader.onload = () => {
        if (type === 'image') {
          setImagePreview(reader.result);
        } else {
          setIconPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);

      if (errors[type]) {
        setErrors({
          ...errors,
          [type]: ''
        });
      }
    };

    const removeImage = (type) => {
      if (type === 'image') {
        setFormData({ ...formData, image: null });
        setImagePreview(null);
      } else {
        setFormData({ ...formData, icon: null });
        setIconPreview(null);
      }
    };

    const validate = () => {
      const newErrors = {};
      
      if (!formData.name.trim()) {
        newErrors.name = 'Category name is required';
      }
      
      if (!formData.description.trim()) {
        newErrors.description = 'Description is required';
      }
      
      if (!category && !formData.image) {
        newErrors.image = 'Category image is required';
      }
      
      if (!category && !formData.icon) {
        newErrors.icon = 'Category icon is required';
      }
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (!validate()) return;
      
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('description', formData.description);
      
      if (formData.image) {
        submitData.append('image', formData.image);
      }
      
      if (formData.icon) {
        submitData.append('icon', formData.icon);
      }
      
      onSubmit(submitData);
    };

    return (
      <form onSubmit={handleSubmit} className="px-6 py-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter category name"
              className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter category description"
              rows={3}
              className={`w-full p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
            />
            {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
          </div>

          {/* Category Image Upload */}
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category Image*</label>
            <div className={`mt-1 flex justify-center px-4 pt-4 pb-4 border-2 ${errors.image ? 'border-red-500' : 'border-dashed border-gray-300'} rounded-lg hover:border-blue-400 transition-colors bg-gray-50`}>
              <div className="space-y-1 text-center">
                {imagePreview ? (
                  <div className="relative mx-auto w-28 h-28">
                    <img
                      src={imagePreview}
                      alt="Category preview"
                      className="object-cover w-full h-full rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage('image')}
                      className="absolute -top-2 -right-2 bg-red-100 p-1 rounded-full text-red-600 hover:bg-red-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto h-10 w-10 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="category-image"
                        className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500"
                      >
                        <span>Upload image</span>
                        <input
                          id="category-image"
                          name="image"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={(e) => handleImageChange(e, 'image')}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </>
                )}
              </div>
            </div>
            {errors.image && <p className="mt-1 text-xs text-red-600">{errors.image}</p>}
          </div>

          {/* Category Icon Upload */}
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category Icon*</label>
            <div className={`mt-1 flex justify-center px-4 pt-4 pb-4 border-2 ${errors.icon ? 'border-red-500' : 'border-dashed border-gray-300'} rounded-lg hover:border-blue-400 transition-colors bg-gray-50`}>
              <div className="space-y-1 text-center">
                {iconPreview ? (
                  <div className="relative mx-auto w-28 h-28">
                    <img
                      src={iconPreview}
                      alt="Icon preview"
                      className="object-contain w-full h-full rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage('icon')}
                      className="absolute -top-2 -right-2 bg-red-100 p-1 rounded-full text-red-600 hover:bg-red-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto h-10 w-10 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="category-icon"
                        className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500"
                      >
                        <span>Upload icon</span>
                        <input
                          id="category-icon"
                          name="icon"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={(e) => handleImageChange(e, 'icon')}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </>
                )}
              </div>
            </div>
            {errors.icon && <p className="mt-1 text-xs text-red-600">{errors.icon}</p>}
          </div>
        </div>
        
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            {category ? 'Update Category' : 'Add Category'}
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="flex-1 flex flex-col px-4 md:px-10 py-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FolderIcon className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">All Categories</h2>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative flex-grow sm:max-w-xs">
            <input
              type="text"
              placeholder="Search categories..."
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
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors justify-center sm:justify-start"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add New Category</span>
            <span className="sm:hidden">Add Category</span>
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Mobile Card View */}
      {!loading && (
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {filteredCategories.map((category, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex items-start p-4">
                <div className="w-20 h-20 overflow-hidden rounded-md border border-gray-300 bg-gray-50 flex-shrink-0">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="font-medium text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{category.description}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-sm px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                      {category.totalproducts} products
                    </span>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 flex">
                <button
                  className="flex-1 py-2 px-4 text-blue-600 hover:bg-blue-50 font-medium transition-colors"
                  onClick={() => handleEditClick(category)}
                >
                  Edit
                </button>
                <div className="w-px bg-gray-200"></div>
                <button
                  className="flex-1 py-2 px-4 text-red-600 hover:bg-red-50 font-medium transition-colors"
                  onClick={() => handleDeleteClick(category)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Desktop Table View */}
      {!loading && (
        <div className="hidden md:block w-full overflow-hidden bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700 divide-y divide-gray-200">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="py-4 px-6 text-left font-medium">Category</th>
                  <th className="py-4 px-6 text-left font-medium">Description</th>
                  <th className="py-4 px-6 text-left font-medium">Icon</th>
                  <th className="py-4 px-6 text-left font-medium">Products</th>
                  <th className="py-4 px-6 text-center font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCategories.map((category, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 overflow-hidden rounded-md border border-gray-300 bg-gray-50 flex items-center justify-center flex-shrink-0">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="truncate max-w-[150px] lg:max-w-xs">
                          <p className="font-medium text-gray-800">{category.name}</p>
                          <p className="text-xs text-gray-500 truncate">{category.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="truncate max-w-[200px]">{category.description}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="w-10 h-10 overflow-hidden rounded-md border border-gray-300 bg-gray-50 flex items-center justify-center">
                        <img
                          src={category.icon}
                          alt={`${category.name} icon`}
                          className="object-contain w-full h-full"
                        />
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {category.totalproducts} products
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded font-medium hover:bg-blue-200 transition-colors"
                          onClick={() => handleEditClick(category)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-1.5 bg-red-100 text-red-700 rounded font-medium hover:bg-red-200 transition-colors"
                          onClick={() => handleDeleteClick(category)}
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
      )}

      {/* No Categories Message */}
      {!loading && filteredCategories.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="mx-auto w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-4">
            <FolderIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No categories found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm ? `No results for "${searchTerm}"` : "You haven't added any categories yet."}
          </p>
          {searchTerm ? (
            <button 
              onClick={() => setSearchTerm("")}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Clear search
            </button>
          ) : (
            <button 
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Add your first category
            </button>
          )}
        </div>
      )}

      {/* Add Category Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-auto animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Add New Category</h3>
              <button 
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <CategoryForm onSubmit={handleAddSubmit} onCancel={() => setShowAddForm(false)} />
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {editCategory && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-auto animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Edit Category</h3>
              <button 
                onClick={() => setEditCategory(null)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <CategoryForm 
              category={editCategory} 
              onSubmit={(formData) => handleEditSubmit(formData, editCategory.slug)} 
              onCancel={() => setEditCategory(null)} 
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteCategory && (
        <div className="fixed inset-0 backdrop-blur-sm  bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm animate-fade-in">
            <div className="p-6 text-center">
              <div className="w-16 h-16 mx-auto flex items-center justify-center bg-red-100 rounded-full mb-4">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Delete Category
              </h3>
              <p className="text-gray-500 mb-6">
                Are you sure you want to delete <span className="font-medium text-gray-900">{deleteCategory.name}</span>? This action cannot be undone.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setDeleteCategory(null)}
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

export default SellerCategories;