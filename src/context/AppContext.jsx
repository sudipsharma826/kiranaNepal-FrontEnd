import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { featuredproducts } from "../data"; 
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const navigate = useNavigate();
  const [user, setUser] = useState(true);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserlogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const currency = "Rs.";

  useEffect(() => {
    setProducts(featuredproducts);
  }, []);

const addToCart=(product)=>{
setCartItems((prev) => ({
  ...prev,
  [product.id]: (prev[product.id] || 0) + 1,
}));
  toast.success("Added to cart");
}
  
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

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserlogin,
    menuOpen,
    setMenuOpen,
    products,
    currency,
    cartItems,
    addToCart,
    removeFromCart,


  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
