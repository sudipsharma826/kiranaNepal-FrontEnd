import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';



const AddProduct = () => {
    const { currency,axios,navigate,categories } = useAppContext();


    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        rating: '',
        reviews: '',
        tags: '',
        stock: '',
        image: null,  // hold File object
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
                image: file,  // store the actual file, not URL
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('description', formData.description);
            data.append('category', formData.category);
            data.append('price', formData.price);
            data.append('rating', formData.rating);
            data.append('reviews', formData.reviews);
            data.append('tags', formData.tags);
            data.append('stock', formData.stock);
            if (formData.image) {
                data.append('image', formData.image);
            }
    
            const res = await axios.post('/api/product/add_product', data);
    
            if (res && res.data) {
                const { success, message } = res.data;
                if (success) {
                    toast.success(message || 'Product added successfully!');
                    navigate('/seller');
                } else {
                    toast.error(message || 'Failed to add product.');
                }
            } else {
                toast.error('No response from server. Please try again.');
            }
        } catch (err) {
            console.error('Add product error:', err);
    
            // Check if it's an Axios error with a server response
            if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error('Failed to add product. Please try again.');
            }
        }
    };
    

    return (
        <div className="flex flex-col items-center min-h-screen bg-white py-4">
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
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
                                    ? URL.createObjectURL(formData.image)
                                    : "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                            }
                            alt="Upload"
                            className="w-32 h-32 object-cover rounded-lg border-2 border-dashed border-gray-400 hover:border-indigo-400 transition"
                        />
                    </label>
                </div>

                {/* Product Name */}
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-medium" htmlFor="name">Product Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter product name"
                        value={formData.name}
                        onChange={handleChange}
                        className="outline-none py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
                        required
                    />
                </div>

                {/* Product Description */}
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-medium" htmlFor="description">Product Description</label>
                    <textarea
                        id="description"
                        rows={4}
                        placeholder="Enter product description"
                        value={formData.description}
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
                        {categories.map((item, index) => (
                            <option key={index} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                </div>

                {/* Price, Rating, Reviews, Tags, Stock */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-lg font-medium" htmlFor="price">Price ({currency})</label>
                        <input
                            id="price"
                            type="number"
                            placeholder="0"
                            value={formData.price}
                            onChange={handleChange}
                            className="outline-none py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-lg font-medium" htmlFor="rating">Rating (1-5)</label>
                        <input
                            id="rating"
                            type="number"
                            placeholder="4.5"
                            step="0.1"
                            min="1"
                            max="5"
                            value={formData.rating}
                            onChange={handleChange}
                            className="outline-none py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-lg font-medium" htmlFor="reviews">Reviews (Count)</label>
                        <input
                            id="reviews"
                            type="number"
                            placeholder="0"
                            value={formData.reviews}
                            onChange={handleChange}
                            className="outline-none py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-lg font-medium" htmlFor="tags">Tags (comma separated)</label>
                        <input
                            id="tags"
                            type="text"
                            placeholder="electronics, gadgets"
                            value={formData.tags}
                            onChange={handleChange}
                            className="outline-none py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div className="flex flex-col gap-2 col-span-2">
                        <label className="text-lg font-medium" htmlFor="stock">Stock Quantity</label>
                        <input
                            id="stock"
                            type="number"
                            placeholder="100"
                            value={formData.stock}
                            onChange={handleChange}
                            className="outline-none py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
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
