import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { ArrowBigLeft } from "lucide-react";

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
  const [address, setAddress] = useState("No address found");
  const [totalAmount, setTotalAmount] = useState(0);

  // Filter cart items
  const cartProducts = products.filter(
    (product) => cartItems[product.id] && cartItems[product.id] > 0
  );

  const shippingFee = getTotalAmount() > 1000 ? 0 : 20;
  const tax = getTotalAmount() * 0.13;

  useEffect(() => {
    const newTotal = getTotalAmount() + tax + shippingFee;
    setTotalAmount(newTotal);
  }, [cartItems, tax, shippingFee]);

  //Checking
  console.log("Total AMount:", getTotalAmount());

  return (
    <div>
      {!cartProducts.length ? (
        <div className="flex flex-col items-center justify-center h-screen text-gray-700">
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <p className="mt-2">Add some products to your cart to get started!</p>
          <button 
            onClick={() => navigate("/products")}
            className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
          >
            Go to Products
          </button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-4 md:px-16 mx-auto">
          <div className="flex-1 max-w-4xl">
            <h1 className="text-3xl font-semibold mb-6">
              Shopping Cart{" "}
              <span className="text-sm text-indigo-500">
                ({getItemCount()} Items)
              </span>
            </h1>

            <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3 border-b">
              <p className="text-left">Product Details</p>
              <p className="text-center">Subtotal</p>
              <p className="text-center">Action</p>
            </div>

            {cartProducts.map((product, index) => {
              const inCart = cartItems[product.id] || 0;
              return (
                <div
                  key={index}
                  className="grid grid-cols-[2fr_1fr_1fr] items-center py-4 border-b text-sm md:text-base"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 border rounded flex items-center justify-center">
                      <img
                        className="max-w-full h-full object-cover"
                        src={product.image}
                        alt={product.name}
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{product.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gray-500 text-sm">Qty:</span>
                        <div className="flex gap-3 bg-primary/10 rounded-full px-4 py-2">
                          <button onClick={() => removeFromCart(product.id)} className="text-primary font-bold text-lg">-</button>
                          <span className="w-6 text-center font-semibold text-gray-600">{inCart}</span>
                          <button onClick={() => addToCart(product)} className="text-primary font-bold text-lg">+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-center font-medium text-gray-700">
                    {currency}{(product.price * inCart).toFixed(2)}
                  </p>
                  <button 
                  onClick={() => removeWholeProduct(product.id)}
                  className=" cursor-pointer mx-auto p-2 hover:text-red-600">
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
              className="group flex items-center gap-2 mt-8 text-indigo-500 hover:text-indigo-600 font-medium"
            >
              <ArrowBigLeft className="w-5 h-5" />
              <span>Continue Shopping</span>
            </button>
          </div>

          <div className="max-w-[360px] w-full bg-gray-50 p-5 mt-10 md:mt-0 md:ml-8 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <hr className="my-5" />

            <div className="mb-6">
              <p className="text-sm font-medium uppercase">Delivery Address</p>
              <div className="relative mt-2">
                <div className="flex justify-between items-center">
                  <p className="text-gray-500">{address}</p>
                  <button
                    onClick={() => setShowAddress(!showAddress)}
                    className="text-indigo-500 hover:underline text-sm"
                  >
                    Change
                  </button>
                </div>
                {showAddress && (
                  <div className="absolute top-full mt-2 bg-white border shadow-md w-full z-10 text-sm">
                    <p
                      onClick={() => {
                        setAddress("Pokhara, Nepal");
                        setShowAddress(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Pokhara, Nepal
                    </p>
                    <p
                      onClick={() => {
                        setAddress("Add address");
                        setShowAddress(false);
                      }}
                      className="px-4 py-2 text-center text-indigo-500 hover:bg-indigo-100 cursor-pointer"
                    >
                      Add address
                    </p>
                  </div>
                )}
              </div>

              <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
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
              <p className="flex justify-between text-lg font-semibold border-t pt-2">
                <span>Total Amount</span>
                <span>{currency}{totalAmount.toFixed(2)}</span>
              </p>
            </div>

            <button className="w-full py-3 mt-6 bg-indigo-500 text-white text-sm font-medium rounded hover:bg-indigo-600 transition">
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
