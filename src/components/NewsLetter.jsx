import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import AdSpaceContainer from './AdsSense';

const Newsletter = () => {
  const {axios}=useAppContext();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
    const response = await axios.post('/api/subscriber/add_subscriber', { email });
    if (response.data.success) {
      toast.success("Subscribed successfully!");
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  }catch (error) {
    toast.error("Email already exists or invalid email address");
  }
};

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-500 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get Exclusive Offers & Updates
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and receive special deals, new product announcements, and recipes directly in your inbox!
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-6 py-4 rounded-full text-gray-900 bg-white/95 backdrop-blur-sm 
                         placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50
                         shadow-lg pr-36"
                required
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2
                         px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white 
                         rounded-full transition-colors flex items-center gap-2
                         font-medium"
              >
                {isSubscribed ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Subscribe</span>
                  </>
                )}
              </button>
            </div>
          </form>
          
          <p className="text-sm text-white/80 mt-4">
            By subscribing, you agree to receive marketing emails from us.
          </p>
        </div>
      </div>
    </div>
  );
   
};

export default Newsletter;