import React, { useState, useRef, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit3, Save, X, Camera, Check, Loader2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';


const ProfilePage = () => {
    const { user,navigate,checkUserLogin,axios } = useAppContext();
    useEffect(() => {
        if (!user) {
            navigate('/');
        }
        checkUserLogin();

    }, []); 
    console.log("User data from context:", user);
    const initialProfile = {
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
        image: user?.image || '/profile_icon.png',
        createdAt: user?.createdAt || new Date().toISOString(),
        updatedAt: user?.updatedAt || new Date().toISOString()
    };
    

  
  console.log("User data:", user);

  // State management
  const [profile, setProfile] = useState(initialProfile);
  const [editableProfile, setEditableProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(initialProfile.image);
  const fileInputRef = useRef(null);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableProfile(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Handle image upload
  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setEditableProfile(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    if (isEditing) {
      // Cancel editing
      setIsEditing(false);
      setEditableProfile(profile);
      setImagePreview(profile.image);
      setErrors({});
    } else {
      // Enter edit mode
      setIsEditing(true);
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!editableProfile.name.trim()) newErrors.name = 'Name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editableProfile.email)) newErrors.email = 'Valid email is required';
    
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(editableProfile.phone)) newErrors.phone = 'Valid 10-digit phone number is required';
    
    if (!editableProfile.address.trim()) newErrors.address = 'Address is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save profile changes
  const saveChanges = async () => {
    if (!validateForm()) return;
  
    setIsLoading(true);
  
    try {
      const formData = new FormData();
      formData.append('name', editableProfile.name);
      formData.append('email', editableProfile.email);
      formData.append('phone', editableProfile.phone);
      formData.append('address', editableProfile.address);
  
      // If the image is a new base64 or File object, append it
      if (fileInputRef.current?.files[0]) {
        formData.append('image', fileInputRef.current.files[0]);
      }``
  
      await axios.put('/api/user/updateProfile', formData);
  
      const updatedProfile = {
        ...editableProfile,
        updatedAt: new Date().toISOString()
      };
  
      setProfile(updatedProfile);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Update failed:', error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  

  // Clear notification after delay
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ show: false, message: '', type: '' });
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl mt-20">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-y-0 flex items-center gap-2 ${
          notification.type === 'success' ? 'bg-green-100 text-green-800 border-l-4 border-green-500' : 
          'bg-red-100 text-red-800 border-l-4 border-red-500'
        }`}>
          {notification.type === 'success' ? (
            <Check className="h-5 w-5" />
          ) : (
            <X className="h-5 w-5" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:shadow-lg">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">User Profile</h1>
          <button 
            onClick={toggleEditMode}
            disabled={isLoading}
            className={`rounded-full p-2 transition-all duration-200 ${
              isEditing 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            {isEditing ? (
              <X className={`h-5 w-5 ${isEditing ? 'text-white' : 'text-blue-600'}`} />
            ) : (
              <Edit3 className="h-5 w-5 text-blue-600" />
            )}
          </button>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          <div className="md:flex gap-8">
            {/* Profile Image */}
            <div className="mb-6 md:mb-0 flex flex-col items-center">
              <div 
                className={`relative rounded-full h-48 w-48 overflow-hidden border-4 ${
                  isEditing ? 'border-blue-400 cursor-pointer' : 'border-gray-200'
                }`}
                onClick={handleImageClick}
              >
                <img 
                  src={imagePreview || 'https://via.placeholder.com/150'} 
                  alt="Profile" 
                  className="h-full w-full object-cover transition-all duration-300"
                />
                {isEditing && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-200 opacity-0 hover:opacity-100">
                    <Camera className="h-10 w-10 text-white" />
                  </div>
                )}
              </div>
              <input 
                type="file" 
                name='image'
                ref={fileInputRef} 
                onChange={handleImageChange} 
                className="hidden" 
                accept="image/*" 
              />
              {isEditing && (
                <p className="text-sm text-gray-500 mt-2">Click to change image</p>
              )}
            </div>

            {/* Profile Details */}
            <div className="flex-1">
              {isEditing ? (
                /* Edit Form */
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                        <User className="h-5 w-5" />
                      </span>
                      <input
                        type="text"
                        name="name"
                        value={editableProfile.name}
                        onChange={handleChange}
                        className={`pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 ${
                          errors.name 
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                        }`}
                      />
                    </div>
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                        <Mail className="h-5 w-5" />
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={editableProfile.email}
                        onChange={handleChange}
                        className={`pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 ${
                          errors.email 
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                        }`}
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                        <Phone className="h-5 w-5" />
                      </span>
                      <input
                        type="text"
                        name="phone"
                        value={editableProfile.phone}
                        onChange={handleChange}
                        className={`pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 ${
                          errors.phone 
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <div className="relative">
                      <span className="absolute top-3 left-3 text-gray-500">
                        <MapPin className="h-5 w-5" />
                      </span>
                      <textarea
                        name="address"
                        value={editableProfile.address}
                        onChange={handleChange}
                        rows="3"
                        className={`pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 ${
                          errors.address 
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                        }`}
                      />
                    </div>
                    {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={toggleEditMode}
                      disabled={isLoading}
                      className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={saveChanges}
                      disabled={isLoading}
                      className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                /* View Mode */
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800">{profile.name}</h2>
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Mail className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="text-gray-800">{profile.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Phone className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="text-gray-800">{profile.phone}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 p-2 rounded-full mt-1">
                          <MapPin className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Address</p>
                          <p className="text-gray-800">{profile.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="bg-gray-100 p-2 rounded-full">
                          <Calendar className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Created</p>
                          <p className="text-gray-700">{formatDate(profile.createdAt)}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-gray-100 p-2 rounded-full">
                          <Calendar className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Last Updated</p>
                          <p className="text-gray-700">{formatDate(profile.updatedAt)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;