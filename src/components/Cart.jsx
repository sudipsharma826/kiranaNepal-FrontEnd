import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { ArrowBigLeft } from "lucide-react";
import { addressdata } from "../data";
import  AddAddress  from "./AddAddress";

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
  } = useAppContext();

  const [showAddress, setShowAddress] = useState(false);
  const [address, setAddress] = useState(addressdata || []);
  const [selectedAddress, setSelectedAddress] = useState(addressdata[0] || "");
  const [totalAmount, setTotalAmount] = useState(0);

  const cartProducts = products.filter(
    (product) => cartItems[product._id] && cartItems[product._id] > 0
  );

  const shippingFee = getTotalAmount() > 1000 ? 0 : 20;
  const tax = getTotalAmount() * 0.13;

  useEffect(() => {
    const newTotal = getTotalAmount() + tax + shippingFee;
    setTotalAmount(newTotal);
  }, [cartItems, tax, shippingFee]);

  return (
    <div className="min-h-screen bg-gray-50">
      {!cartProducts.length ? (
        <div className="flex flex-col items-center justify-center h-screen text-gray-700">
          <h2 className="text-3xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-gray-500">Add some products to your cart to get started!</p>
          <button 
            onClick={() => navigate("/products")}
            className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
          >
            Go to Products
          </button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-4 md:px-16 mx-auto gap-8">
          {/* Left - Cart Items */}
          <div className="flex-1 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
              Shopping Cart{" "}
              <span className="text-sm text-indigo-500">
                ({getItemCount()} Items)
              </span>
            </h1>

            <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-semibold pb-3 border-b">
              <p>Product</p>
              <p className="text-center">Subtotal</p>
              <p className="text-center">Remove</p>
            </div>

            {cartProducts.map((product) => {
              const inCart = cartItems[product._id] || 0;
              return (
                <div
                  key={product._id}
                  className="grid grid-cols-[2fr_1fr_1fr] items-center py-5 border-b"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 border rounded flex items-center justify-center bg-white">
                      <img
                        className="max-w-full h-full object-cover rounded"
                        src={product.image}
                        alt={product.name}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gray-500 text-sm">Qty:</span>
                        <div className="flex gap-2 bg-gray-200 rounded-full px-4 py-1 items-center">
                          <button onClick={() => removeFromCart(product._id)} className="text-xl font-bold text-indigo-600">-</button>
                          <span className="text-center font-semibold text-gray-700">{inCart}</span>
                          <button onClick={() => addToCart(product)} className="text-xl font-bold text-indigo-600">+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-center font-semibold text-gray-700">
                    {currency}{(product.price * inCart).toFixed(2)}
                  </p>
                  <button 
                    onClick={() => removeWholeProduct(product._id)}
                    className="text-center mx-auto p-2 hover:text-red-600"
                  >
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                      <path
                        d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                        stroke="#FF532E"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              );
            })}

            <button
              onClick={() => navigate("/products")}
              className="flex items-center gap-2 mt-8 text-indigo-500 hover:text-indigo-600 font-medium transition"
            >
              <ArrowBigLeft className="w-5 h-5" />
              <span>Continue Shopping</span>
            </button>
          </div>

          {/* Right - Summary */}
          <div className="max-w-[360px] w-full bg-white p-6 border border-gray-200 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
            <hr className="my-4" />

            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700">Delivery Address</p>
              <div className="relative mt-2">
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 text-sm truncate">{selectedAddress}</p>
                  <button
                    onClick={() => setShowAddress(!showAddress)}
                    className="text-indigo-500 hover:underline text-sm"
                  >
                    Change
                  </button>
                </div>

                {showAddress && (
                  <div className="absolute top-full mt-2 bg-white border shadow-md w-full z-10 text-sm rounded">
                    {address.map((addr, idx) => (
                      <p
                        key={idx}
                        onClick={() => {
                          setSelectedAddress(addr);
                          setShowAddress(false);
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {addr}
                      </p>
                    ))}
                    <p
                      onClick={() => navigate("/add_address")} 
                      className="px-4 py-2 text-center text-indigo-500 hover:bg-indigo-100 cursor-pointer border-t"
                    >
                      + Add new address
                    </p>

                  </div>
                )}
              </div>

              <p className="text-sm font-semibold mt-6 text-gray-700">Payment Method</p>
              <select className="w-full mt-2 border px-3 py-2 text-sm rounded outline-none">
                <option value="COD">Cash On Delivery</option>
                <option value="Online">Online Payment</option>
              </select>
            </div>

            <hr />

            <div className="text-gray-700 mt-4 space-y-2 text-sm">
              <p className="flex justify-between">
                <span>Subtotal</span>
                <span>{currency}{getTotalAmount().toFixed(2)}</span>
              </p>
              <p className="flex justify-between">
                <span>Shipping Fee</span>
                <span className={shippingFee === 0 ? "text-green-600" : ""}>
                  {shippingFee === 0 ? "Free" : `${currency}${shippingFee.toFixed(2)}`}
                </span>
              </p>
              <p className="flex justify-between">
                <span>Tax (13%)</span>
                <span>{currency}{tax.toFixed(2)}</span>
              </p>
              <p className="flex justify-between text-base font-bold border-t pt-2">
                <span>Total Amount</span>
                <span>{currency}{totalAmount.toFixed(2)}</span>
              </p>
            </div>

            <button className="w-full py-3 mt-6 bg-indigo-500 text-white font-semibold rounded hover:bg-indigo-600 transition">
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
