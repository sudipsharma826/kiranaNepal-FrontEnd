import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

// Set Axios defaults
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const isFirstRender = useRef(true);

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});
  const [categories, setCategories] = useState([]);

  const currency = import.meta.env.VITE_CURRENCY;

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

  const removeWholeProduct = (productId) => {
    setCartItems((prevItems) => {
      const updatedCart = { ...prevItems };
      delete updatedCart[productId];
      return updatedCart;
    });
    toast.success("Product removed from cart.");
  };

  const getItemCount = () => {
    return Object.values(cartItems).reduce((total, count) => total + count, 0);
  };

  const getTotalAmount = () => {
    return Object.keys(cartItems).reduce((total, key) => {
      const product = products.find(
        (item) => item.id === key || item.id === parseInt(key)
      );
      return product ? total + product.price * cartItems[key] : total;
    }, 0);
  };

  const checkSellerLogin = async () => {
    try {
      const response = await axios.get("/api/seller/checkSeller");
      if (response.data.success) {
        setIsSeller(true);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setIsSeller(false);
      } else if (error.response?.status === 500) {
        toast.error("Internal server error. Please try again later.");
      }
    }
  };

  const checkUserLogin = async () => {
    try {
      const response = await axios.get("/api/user/isAuth");
      if (response.data.success) {
        console.log("User logged in successfully:", response.data.data);
        setUser({
          id: response.data.data._id,
          name: response.data.data.name,
          email: response.data.data.email,
          image: response.data.data.image,
          phone: response.data.data.phone,
          address: response.data.data.address,
          createdAt: response.data.data.createdAt,
          updatedAt: response.data.data.updatedAt,
        });
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setUser(null);
      } else if (error.response?.status === 500) {
        toast.error("Internal server error. Please try again later.");
      }
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/product/get_products");
      if (response.data.success) {
        const normalizedProducts = response.data.data.map((product) => ({
          ...product,
          id: product._id,
        }));
        setProducts(normalizedProducts);
      } else {
        toast.error("Failed to fetch products.");
      }
    } catch (error) {
      toast.error("Error fetching products.");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/category/get_category_public");
      if (response.data.success) {
        setCategories(response.data.data);
        console.log("Categories fetched successfully:", response.data.data);
      } else {
        toast.error("Failed to fetch categories.");
      }
    } catch (error) {
      toast.error("Error fetching categories.");
    }
  };

  //Get cartItems from backend when user logs in
    useEffect(() => {
        const fetchCartItems = async () => {
        try {
            const response = await axios.get("/api/cart/get_cart");
            if (response.data.success) {
            setCartItems(response.data.data);
            } else {
            toast.error("Failed to fetch cart items.");
            }
        } catch (error) {
            toast.error("Error fetching cart items.");
        }
        };
    
        if (user) {
        fetchCartItems();
        }
    }, [user]);

  

  // Update cartItems on backend when changed
  useEffect(() => {
    if (!user) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    //Updated cartitem
  const updateCart = async () => {
    try {
      const response = await axios.post("/api/cart/update_cart", { cartItems });
      if (response.data.success) {
        console.log("User cart updated successfully:", response.data.data);
        
      } else {
        toast.error("Failed to update cart.");
      }
    } catch (error) {
      toast.error("Error updating cart.");
    }
  };

    updateCart();
  }, [cartItems]);
  // Load initial data on mount
  useEffect(() => {
    checkUserLogin();
    fetchCategories();
    fetchProducts();
    checkSellerLogin();
    
  }, []);


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
    axios,
    categories,
    fetchProducts,
    fetchCategories,
    setCartItems,
    checkUserLogin,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
