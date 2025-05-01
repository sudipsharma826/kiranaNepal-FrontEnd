import React, { use, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';

const SellerLogin = () => {
    const {isSeller,setIsSeller , navigate ,axios} = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  useEffect(() => {
    if (isSeller) {
        navigate('/seller'); // Redirect to seller dashboard if already logged in
    }
    }, [isSeller]);

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        console.log(email, password);
        const response = await axios.post('/api/seller/login', { email, password });
        const { message,data} = response?.data;
    
        if (response.data.success) {
          setIsSeller(true);
          toast.success(message);
          navigate('/seller');
        }
      } catch(error) {
        const message = error.response?.data?.message;
        console.log(message);
        if (error.response && error.response.status === 401) {  
          toast.error(message);
        } else if (error.response && error.response.status === 500) {
          toast.error("Internal server error. Please try again later.");
        }
      }
    };
    

  return !isSeller && ( // Render the login form only if isSeller is false
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl"
      >
        <h2 className="text-3xl font-bold text-indigo-600 text-center mb-1">Seller Login</h2>
        <p className="text-gray-500 text-sm text-center mb-8">Please sign in to your dashboard</p>

        <div className="relative mb-6">
          <label className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#9CA3AF" />
            </svg>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400 text-sm"
          />
        </div>

        <div className="relative mb-6">
          <label className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#9CA3AF"/>
            </svg>
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400 text-sm"
          />
        </div>

        <div className="text-right text-sm mb-4">
          <a href="#" className="text-indigo-500 hover:underline">Forgot password?</a>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition duration-200"
        >
          Login
        </button>

        <p className="text-center text-gray-500 text-sm mt-6">
          Don’t have an account? <a href="#" className="text-indigo-500 hover:underline">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default SellerLogin;
