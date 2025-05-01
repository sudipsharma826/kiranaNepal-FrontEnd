import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { featuredproducts } from "../data";
import toast from "react-hot-toast";
import axios from "axios";

// Create context
export const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  // State
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});

  // Env variable
  const currency = import.meta.env.VITE_CURRENCY;
  console.log("currency in AppContext:", currency);

  // Load products on mount
  useEffect(() => {
    setProducts(featuredproducts);
  }, []);


  // Add to cart
  const addToCart = (product) => {
    setCartItems((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1,
    }));
    toast.success("Added to cart");
  };

  // Remove one from cart
  const removeFromCart = (productId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[productId] > 1) {
        updated[productId] -= 1;
      } else {
        delete updated[productId];
      }
      return updated;
    });
    toast.success("Removed from cart");
  };

  // Remove entire product from cart
  const removeWholeProduct = (productId) => {
    setCartItems((prevItems) => {
      const updatedCart = { ...prevItems };
      delete updatedCart[productId];
      return updatedCart;
    });
    toast.success("Product removed from cart.");
  };

  // Get total item count in cart
  const getItemCount = () => {
    return Object.values(cartItems).reduce((total, count) => total + count, 0);
  };

  // Get total price of cart
  const getTotalAmount = () => {
    return Object.keys(cartItems).reduce((total, key) => {
      const product = products.find((item) => item.id === parseInt(key));
      return product ? total + product.price * cartItems[key] : total;
    }, 0);
  };

  // Context value
  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    menuOpen,
    setMenuOpen,
    products,
    currency,
    cartItems,
    addToCart,
    removeFromCart,
    removeWholeProduct,
    searchQuery,
    setSearchQuery,
    getItemCount,
    getTotalAmount,
    axios, // optional if you're injecting globally
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Hook to use context
export const useAppContext = () => useContext(AppContext);
