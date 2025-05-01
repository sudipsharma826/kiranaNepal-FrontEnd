import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { featuredproducts } from "../data";
import toast from "react-hot-toast";
import axios from "axios";

// Set the url and cookies for axios globally
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState({});

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
            const product = products.find((item) => item.id === parseInt(key));
            return product ? total + product.price * cartItems[key] : total;
        }, 0);
    };

    const checkSellerLogin = async () => {
        try {
            const response = await axios.get("/api/seller/checkSeller");
            if (response.data.success) {
                setIsSeller(true);
                toast.success(response?.data.message);
            }
        } catch (error) {
            const message = error.response?.data?.message;
            if (error.response && error.response.status === 401) {
                setIsSeller(false);
                toast.error(message);
            } else if (error.response && error.response.status === 500) {
                toast.error("Internal server error. Please try again later.");
            }
        }
    };

    useEffect(() => {
        setProducts(featuredproducts);
    }, []);

    useEffect(() => {
        if (location.pathname=== "/seller") {
            checkSellerLogin();
        }
    }, [location.pathname]);

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
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
