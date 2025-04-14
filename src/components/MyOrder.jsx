import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Search
} from 'lucide-react';

const orders = [
  {
    id: "ORD-2024-001",
    date: "2024-03-15",
    total: 45.97,
    status: "delivered",
    deliveryDate: "2024-03-18",
    trackingNumber: "TRK123456789",
    items: [
      {
        id: 1,
        name: "Organic Bananas",
        quantity: 2,
        price: 2.99,
        image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=600"
      },
      {
        id: 2,
        name: "Fresh Milk",
        quantity: 1,
        price: 3.49,
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=600"
      }
    ],
    timeline: [
      { status: "Order Placed", date: "2024-03-15 09:00 AM" },
      { status: "Order Confirmed", date: "2024-03-15 09:30 AM" },
      { status: "Order Shipped", date: "2024-03-16 10:00 AM" },
      { status: "Out for Delivery", date: "2024-03-18 08:00 AM" },
      { status: "Delivered", date: "2024-03-18 02:30 PM" }
    ]
  },
  {
    id: "ORD-2024-002",
    date: "2024-03-14",
    total: 35.98,
    status: "in-transit",
    deliveryDate: "2024-03-17",
    trackingNumber: "TRK987654321",
    items: [
      {
        id: 3,
        name: "Whole Grain Bread",
        quantity: 2,
        price: 4.99,
        image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=600"
      }
    ],
    timeline: [
      { status: "Order Placed", date: "2024-03-14 02:00 PM" },
      { status: "Order Confirmed", date: "2024-03-14 02:30 PM" },
      { status: "Order Shipped", date: "2024-03-15 11:00 AM" }
    ]
  }
];

const getStatusIcon = (status) => {
  switch (status) {
    case 'delivered':
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    case 'in-transit':
      return <Truck className="h-6 w-6 text-blue-500" />;
    case 'processing':
      return <Clock className="h-6 w-6 text-yellow-500" />;
    default:
      return <AlertCircle className="h-6 w-6 text-gray-500" />;
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'delivered':
      return 'Delivered';
    case 'in-transit':
      return 'In Transit';
    case 'processing':
      return 'Processing';
    default:
      return 'Unknown';
  }
};

function MyOrder() {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        <p className="text-gray-600 mt-2">Track and manage your orders</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search orders by ID or product name..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Order Header */}
            <div className="p-6 cursor-pointer" onClick={() => toggleOrderDetails(order.id)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Package className="h-6 w-6 text-gray-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                    <p className="text-sm text-gray-500">Ordered on {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(order.status)}
                    <span className="text-sm font-medium">{getStatusText(order.status)}</span>
                  </div>
                  {expandedOrder === order.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Order Details */}
            {expandedOrder === order.id && (
              <div className="border-t border-gray-200">
                {/* Timeline */}
                <div className="p-6 bg-gray-50">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Order Timeline</h4>
                  <div className="space-y-4">
                    {order.timeline.map((event, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex items-center">
                          <div className="relative">
                            <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                            {index !== order.timeline.length - 1 && (
                              <div className="absolute top-3 left-1.5 h-full w-0.5 bg-green-200"></div>
                            )}
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">{event.status}</p>
                          <p className="text-sm text-gray-500">{event.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Items */}
                <div className="p-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Order Items</h4>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="ml-4 flex-1">
                          <h5 className="text-sm font-medium text-gray-900">{item.name}</h5>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity} × ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          ${(item.quantity * item.price).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="p-6 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Tracking Number:</p>
                      <p className="text-sm font-medium text-gray-900">{order.trackingNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total Amount:</p>
                      <p className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                  {order.status === 'delivered' && (
                    <button className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                      Buy Again
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h2>
          <p className="text-gray-600 mb-6">Try adjusting your search terms</p>
          <Link
            to="/categories"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
}

export default MyOrder;
