import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { ArrowBigLeft, ShoppingBag, Plus, Minus, Trash2, CreditCard, Truck, Tag } from "lucide-react";
import toast from "react-hot-toast";

const CartPage = () => {
  const {
    getItemCount,
    navigate,
    cartItems,
    products,
    addToCart,
    removeFromCart,
    currency,
    getTotalAmount,
    removeWholeProduct,
    axios,
    setCartItems,
    user,
  } = useAppContext();

  

  console.log("user? Cart Items from cart page:", cartItems);

  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [onlineOption, setOnlineOption] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cartProducts = products.filter(
    (product) => cartItems[product._id] && cartItems[product._id] > 0
  );

  const shippingFee = getTotalAmount() > 1000 ? 0 : 20;
  const tax = getTotalAmount() * 0.13;

  useEffect(() => {
    const newTotal = getTotalAmount() + tax + shippingFee;
    setTotalAmount(newTotal);
  }, [cartItems, tax, shippingFee, getTotalAmount]);

  const handleOrder = async () => {
    if (!user?.address) {
      toast.error("Please add a delivery address.");
      return;
    }

    if (paymentMethod === "Online" && !onlineOption) {
      toast.error("Please select an online payment option.");
      return;
    }

    setIsSubmitting(true);

    let finalPaymentMethod = paymentMethod;
    if (paymentMethod === "Online" && onlineOption) {
      finalPaymentMethod = onlineOption;
    }

    const orderData = {
      items: cartProducts.map((product) => ({
        id: product._id,
        quantity: cartItems[product._id],
      })),
      address: user?.address,
      totalAmount,
      shippingFee,
      tax,
      paymentMethod: finalPaymentMethod,
    };

    try {
      // Use different endpoints based on payment method
      const endpoint = paymentMethod === "COD" 
        ? "/api/order/place_order_COD" 
        : "/api/order/place_order_online";
      
      const response = await axios.post(endpoint, orderData);
      
      if (response.data.success) {
        toast.success("Order placed successfully!");
        navigate("/orders");
        setCartItems({});
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Error placing order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!cartProducts.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg text-center animate-fadeIn">
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-indigo-50 rounded-full">
            <ShoppingBag className="w-10 h-10 text-indigo-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <button
            onClick={() => navigate("/products")}
            className="w-full py-3 px-6 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Your Shopping Cart 
            <span className="ml-2 text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              {getItemCount()} {getItemCount() === 1 ? 'Item' : 'Items'}
            </span>
          </h1>
          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
          >
            <ArrowBigLeft className="w-5 h-5" />
            <span>Continue Shopping</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left - Cart Items */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="hidden sm:grid grid-cols-12 text-sm font-medium text-gray-500 px-6 py-4 bg-gray-50 border-b">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Subtotal</div>
              </div>

              <div className="divide-y divide-gray-100">
                {cartProducts.map((product) => {
                  const inCart = cartItems[product._id] || 0;
                  return (
                    <div key={product._id} className="p-6 sm:grid sm:grid-cols-12 items-center gap-4">
                      {/* Product Info (Mobile + Desktop) */}
                      <div className="col-span-6 flex gap-4 mb-4 sm:mb-0">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-gray-50 border border-gray-100 rounded-lg overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                          />
                        </div>
                        <div className="flex flex-col justify-between py-1">
                          <h3 className="font-medium text-gray-900 line-clamp-2">{product.name}</h3>
                          <button 
                            onClick={() => removeWholeProduct(product._id)}
                            className="flex items-center text-sm text-red-500 hover:text-red-700 transition-colors w-fit"
                          >
                            <Trash2 className="w-4 h-4 mr-1" /> Remove
                          </button>
                        </div>
                      </div>

                      {/* Price (Mobile + Desktop) */}
                      <div className="col-span-2 text-center hidden sm:block">
                        <p className="font-medium text-gray-900">{currency}{product.price}</p>
                      </div>

                      {/* Mobile Price & Quantity Controls Layout */}
                      <div className="sm:hidden flex justify-between items-center mb-3">
                        <p className="font-medium text-gray-900">{currency}{product.price}</p>
                        <div className="flex items-center border border-gray-200 rounded-full">
                          <button 
                            onClick={() => removeFromCart(product._id)} 
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-indigo-600 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{inCart}</span>
                          <button 
                            onClick={() => addToCart(product)} 
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-indigo-600 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Desktop Quantity Controls */}
                      <div className="col-span-2 hidden sm:flex sm:justify-center">
                        <div className="flex items-center border border-gray-200 rounded-full">
                          <button 
                            onClick={() => removeFromCart(product._id)} 
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-indigo-600 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{inCart}</span>
                          <button 
                            onClick={() => addToCart(product)} 
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-indigo-600 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="col-span-2 sm:text-center">
                        <p className="font-medium text-gray-900 sm:text-right">
                          {currency}{(product.price * inCart).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right - Order Summary */}
          <div className="w-full lg:w-[380px] lg:flex-shrink-0">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-4">
              <div className="px-6 py-4 bg-indigo-600 text-white">
                <h2 className="text-xl font-bold">Order Summary</h2>
              </div>
              
              <div className="p-6">
                {/* Delivery Address Section */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Truck className="w-5 h-5 text-indigo-500" />
                    <h3 className="font-medium text-gray-800">Delivery Address</h3>
                  </div>
                  
                  <div className="relative">
                    <div className="p-3 border rounded-lg flex justify-between items-center">
                      <div className="mr-2 flex-1 min-w-0">
                        {user?.address ? (
                          <p className="text-gray-700 truncate">
                            {user?.address}
                          </p>
                        ) : (
                          <p className="text-gray-400 italic">No delivery address set</p>
                        )}
                      </div>
                      <button
                        onClick={() => navigate("/profile")}
                        className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>

                {/* Payment Method Section */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <CreditCard className="w-5 h-5 text-indigo-500" />
                    <h3 className="font-medium text-gray-800">Payment Method</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setPaymentMethod("COD");
                        setOnlineOption(null);
                      }}
                      className={`w-full p-3 border rounded-lg flex items-center gap-3 transition-all hover:border-indigo-500 ${
                        paymentMethod === "COD" 
                          ? "border-indigo-500 bg-indigo-50" 
                          : "border-gray-200"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === "COD" 
                          ? "border-indigo-600" 
                          : "border-gray-300"
                      }`}>
                        {paymentMethod === "COD" && (
                          <div className="w-3 h-3 rounded-full bg-indigo-600" />
                        )}
                      </div>
                      <span className={`font-medium ${
                        paymentMethod === "COD" 
                          ? "text-indigo-800" 
                          : "text-gray-700"
                      }`}>Cash On Delivery</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod("Online")}
                      className={`w-full p-3 border rounded-lg flex items-center gap-3 transition-all hover:border-indigo-500 ${
                        paymentMethod === "Online" 
                          ? "border-indigo-500 bg-indigo-50" 
                          : "border-gray-200"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === "Online" 
                          ? "border-indigo-600" 
                          : "border-gray-300"
                      }`}>
                        {paymentMethod === "Online" && (
                          <div className="w-3 h-3 rounded-full bg-indigo-600" />
                        )}
                      </div>
                      <span className={`font-medium ${
                        paymentMethod === "Online" 
                          ? "text-indigo-800" 
                          : "text-gray-700"
                      }`}>Online Payment</span>
                    </button>
                  </div>

                  {/* Online Payment Options */}
                  {paymentMethod === "Online" && (
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setOnlineOption("Khalti")}
                        className={`p-3 border rounded-lg transition-all duration-200 flex flex-col items-center justify-center ${
                          onlineOption === "Khalti" 
                            ? "border-purple-500 bg-purple-50 shadow-sm" 
                            : "border-gray-200 hover:border-purple-500"
                        }`}
                      >
                        <div className="h-10 flex items-center justify-center mb-2">
                          <img 
                            src='/assets/khalti_logo.svg'
                            alt="Khalti" 
                            className="max-h-8 object-contain" 
                          />
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          onlineOption === "Khalti" 
                            ? "border-purple-600" 
                            : "border-gray-300"
                        }`}>
                          {onlineOption === "Khalti" && (
                            <div className="w-2 h-2 rounded-full bg-purple-600" />
                          )}
                        </div>
                      </button>

                      <button
                        onClick={() => setOnlineOption("eSewa")}
                        className={`p-3 border rounded-lg transition-all duration-200 flex flex-col items-center justify-center ${
                          onlineOption === "eSewa" 
                            ? "border-green-500 bg-green-50 shadow-sm" 
                            : "border-gray-200 hover:border-green-500"
                        }`}
                      >
                        <div className="h-10 flex items-center justify-center mb-2">
                          <img 
                            src="/assets/esewa_logo.png" 
                            alt="eSewa" 
                            className="max-h-7 object-contain" 
                          />
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          onlineOption === "eSewa" 
                            ? "border-green-600" 
                            : "border-gray-300"
                        }`}>
                          {onlineOption === "eSewa" && (
                            <div className="w-2 h-2 rounded-full bg-green-600" />
                          )}
                        </div>
                      </button>
                    </div>
                  )}
                </div>

                {/* Cost Breakdown */}
                <div className="mb-6 space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-5 h-5 text-indigo-500" />
                    <h3 className="font-medium text-gray-800">Order Details</h3>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span className="font-medium">{currency}{getTotalAmount().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <div className="flex items-center gap-1">
                      <span>Shipping:</span>
                      {shippingFee === 0 && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Free</span>
                      )}
                    </div>
                    <span className="font-medium">{currency}{shippingFee.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (13%):</span>
                    <span className="font-medium">{currency}{tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-bold text-lg text-gray-900">
                      <span>Total:</span>
                      <span>{currency}{totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleOrder}
                  disabled={isSubmitting || !user?.address || (paymentMethod === "Online" && !onlineOption)}
                  className={`w-full py-3 rounded-lg text-white font-medium transition-all duration-200 
                    ${!isSubmitting && user?.address && (paymentMethod !== "Online" || onlineOption) 
                      ? "bg-indigo-600 hover:bg-indigo-700 transform hover:scale-[1.02] active:scale-[0.98]"
                      : "bg-indigo-300 cursor-not-allowed"
                    }`}
                >
                  {isSubmitting ? "Processing..." : "Place Order"}
                </button>

                {(!user?.address || (paymentMethod === "Online" && !onlineOption)) && (
                  <p className="mt-2 text-sm text-red-500 text-center">
                    {!user?.address 
                      ? "Please add a delivery address" 
                      : "Please select an online payment option"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;