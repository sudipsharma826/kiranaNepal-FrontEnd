import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const AddAddress = () => {
  const { navigate, axios } = useAppContext();

  const [formData, setFormData] = useState({
    address: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAddress = async (e) => {
    e.preventDefault(); 

    const { address, phone, street, city, state, country, pincode } = formData;
    if (!address || !phone || !street || !city || !state || !country || !pincode) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("/api/address/add_address", formData); 
      if (response.data.success) {
        toast.success("Address added successfully!");
        setFormData({
          address: "",
          phone: "",
          street: "",
          city: "",
          state: "",
          country: "",
          pincode: "",
        });
        navigate('/cart'); 
      } else {
        toast.error("Failed to add address. Please try again.");
      }
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("An error occurred while adding the address. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-10">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        {/* Left: Form */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Add New <span className="text-blue-400">Address</span>
          </h2>
          <form onSubmit={handleAddAddress} className="space-y-4">
            <input
              type="text"
              name="address"
              placeholder="Address Name"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 text-sm outline-indigo-500"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 text-sm outline-indigo-500"
            />
            <textarea
              name="street"
              placeholder="Street Address"
              value={formData.street}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 text-sm resize-none h-24 outline-indigo-500"
            />
            <div className="flex gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 text-sm outline-indigo-500"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 text-sm outline-indigo-500"
              />
            </div>
            <div className="flex gap-4">
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 text-sm outline-indigo-500"
              />
              <input
                type="text"
                name="pincode"
                placeholder="PostalCode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 text-sm outline-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-sm font-medium transition"
            >
              Save Address
            </button>
          </form>
        </div>

        {/* Right: Image */}
        <div className="md:w-1/2 bg-indigo-50 p-4 flex items-center justify-center">
          <img
            src="/assets/add_address_image.svg"
            alt="Location Illustration"
            className="w-full h-full object-cover rounded-b-xl md:rounded-b-none md:rounded-r-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
