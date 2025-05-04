import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Search,
  User,
  Mail,
  MapPin,
  Ban
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

function MyOrder() {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { currency, axios } = useAppContext();

  // Fetching order data
  const fetchOrderData = async () => {
    try {
      const response = await axios.get('/api/order/get_order');
      if (response.data.success) {
        setOrders(response.data.data);
        if(response.data.data.length === 0) {
          toast.error('No orders found.');
        }
      } else {
        toast.error('Failed to fetch orders.');
        setOrders([]);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('An error occurred while fetching orders. Please try again.');
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in-transit':
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-600" />;
      case 'processing':
      case 'order confirmed':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'canceled':
        return <Ban  className="h-5 w-5 text-red-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">My Orders</h1>
        <p className="text-gray-600 mt-2">Track, view, and manage all your orders in one place.</p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by Order ID or Product Name..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="space-y-6">
        {filteredOrders.map((order) => (
          <div key={order._id} className="bg-white rounded-xl shadow hover:shadow-lg transition">
            <div
              className="flex justify-between items-center p-6 cursor-pointer"
              onClick={() => toggleOrderDetails(order._id)}
            >
              <div className="flex items-center space-x-4">
                <Package className="h-6 w-6 text-gray-400" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{order.orderId}</h3>
                  <p className="text-sm text-gray-500">
                    Placed on {new Date(order.date).toLocaleDateString()} • Payment: {order.paymentMethod}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(order.status)}
                  <span className="text-sm font-medium capitalize">{order.status}</span>
                </div>
                {expandedOrder === order._id ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>

            {expandedOrder === order._id && (
              <div className="border-t border-gray-200 bg-gray-50 p-6">
                {/* User Details */}
                <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-700">{order.userId.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-700">{order.userId.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 col-span-1 sm:col-span-2">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-700">{order.userId.address}</span>
                  </div>
                </div>

                {/* Ordered Items */}
                <h4 className="text-md font-semibold text-gray-900 mb-4">Ordered Items</h4>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item._id} className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="ml-4 flex-1">
                        <h5 className="text-sm font-medium text-gray-900">{item.name}</h5>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity} × {currency}{item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        {currency}{(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totals & Tracking */}
                <div className="mt-6 border-t pt-4 flex justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Tracking Number:</p>
                    <p className="text-sm font-medium text-gray-900">{order.trackingNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total Amount:</p>
                    <p className="text-lg font-bold text-gray-900">{currency}{order.total.toFixed(2)}</p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="mt-6">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Delivery Timeline</h4>
                  <div className="space-y-4">
                    {order.timeline.map((event, index) => (
                      <div key={event._id} className="flex items-start">
                        <div className="relative">
                          <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                          {index !== order.timeline.length - 1 && (
                            <div className="absolute top-3 left-1.5 h-full w-0.5 bg-green-200"></div>
                          )}
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900 capitalize">{event.status}</p>
                          <p className="text-sm text-gray-500">{new Date(event.date).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {order.status.toLowerCase() === 'delivered' && (
                  <button className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition">
                    Buy Again
                  </button>
                )}
              </div>
            )}
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h2>
            <p className="text-gray-600 mb-6">Try adjusting your search terms</p>
            <Link
              to="/categories"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrder;
