import React, { useState } from 'react';
import { orders } from '../../data';
import { useAppContext } from '../../context/AppContext';

const SellerOrders = () => {
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const { currency } = useAppContext();

  const toggleOrder = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <div className="flex-1 flex flex-col px-4 md:px-10 py-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Seller Orders</h2>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            {/* Order Summary */}
            <div
              className="flex justify-between items-center p-5 cursor-pointer bg-gradient-to-r from-blue-50 via-white to-blue-50"
              onClick={() => toggleOrder(order.id)}
            >
              <div>
                <div className="font-semibold text-gray-700">Order ID: {order.id}</div>
                <div className="text-sm text-gray-500">Date: {order.date}</div>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-sm font-medium text-blue-600">{order.status.toUpperCase()}</span>
                <div className="font-bold text-green-600">{currency}{order.total}</div>
              </div>
            </div>

            {/* Expanded Order Details */}
            {expandedOrderId === order.id && (
              <div className="p-6 space-y-6 border-t border-gray-100 bg-white animate-fadeIn">
                
                {/* Order Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm">
                  <div><strong>Tracking Number:</strong> {order.trackingNumber}</div>
                  <div><strong>Delivery Date:</strong> {order.deliveryDate}</div>
                  <div><strong>Current Status:</strong> {order.status}</div>
                </div>

                {/* Items List */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Ordered Items</h3>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center p-3 border rounded-lg bg-gray-50 hover:bg-gray-100">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-gray-500">
                            Qty: {item.quantity} | Price: ${item.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Update */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Update Status</h3>
                  <select
                    className="border border-gray-300 rounded-md p-2 w-full md:w-1/2 text-sm focus:ring-2 focus:ring-blue-400"
                    defaultValue={order.status}
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Order Confirmed">Order Confirmed</option>
                    <option value="Order Shipped">Order Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Order Timeline</h3>
                  <div className="border-l-4 border-blue-300 pl-4 space-y-4">
                    {order.timeline.map((event, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute w-2 h-2 bg-blue-400 rounded-full -left-2 top-1.5"></div>
                        <div className="text-gray-800 font-medium">{event.status}</div>
                        <div className="text-xs text-gray-400">{event.date}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerOrders;
