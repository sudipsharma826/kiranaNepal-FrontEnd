import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { featuredproducts } from "../data"; 
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false); 
  const [menuOpen, setMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});
  console.log("Search Query:", searchQuery); // Log the search query to check its value
  const currency = "Rs.";

  useEffect(() => {
    setProducts(featuredproducts);
  }, []);

  const addToCart = (product) => {
    setCartItems((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1,
    }));
    toast.success("Added to cart");
  };
  
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

  //Get Cart Items Count
  const getItemCount = () => {
    let totalCount=0;
    for (const key in cartItems) {
      totalCount += cartItems[key]; // because cartItems is like :
      // { "productId": quantity, ... }
      // e.g. { "1": 2, "2": 1 } => totalCount = 2 + 1 = 3
    }
    return totalCount;
  }

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
    searchQuery,
    setSearchQuery,
    getItemCount
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
