import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Package, CheckCircle, Truck, Clock, BadgeCheck, Boxes, Ban } from 'lucide-react';

const statusIcons = {
  'Order Placed': <Package className="w-5 h-5 text-gray-600" />,
  'Order Confirmed': <BadgeCheck className="w-5 h-5 text-blue-600" />,
  'Order Shipped': <Truck className="w-5 h-5 text-indigo-600" />,
  'Out for Delivery': <Truck className="w-5 h-5 text-yellow-600 animate-bounce" />,
  'Delivered': <Boxes className="w-5 h-5 text-green-600" />,
  'Cancelled': <Ban className="w-5 h-5 text-red-600" />,
};

const SellerOrders = () => {
  const { axios, toast, currency } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/order/get_orders');
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error('Failed to fetch orders.');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('An error occurred while fetching orders. Please try again.');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const toggleOrder = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await axios.put('/api/order/update_order_status', {
        orderId,
        status,
      });
      if (response.data.success) {
        toast.success('Order status updated successfully!');
        fetchOrders();
      } else {
        toast.error('Failed to update order status.');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('An error occurred while updating order status. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredOrders = orders.filter((order) => {
    return (
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="flex-1 flex flex-col px-4 md:px-10 py-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Seller Orders</h2>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Order ID or Status..."
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-6">
        {filteredOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            {/* Order Summary */}
            <div
              className="flex justify-between items-center p-5 cursor-pointer bg-gradient-to-r from-blue-50 via-white to-blue-50"
              onClick={() => toggleOrder(order._id)}
            >
              <div>
                <div className="font-semibold text-gray-700">Order ID: {order.orderId}</div>
                <div className="text-sm text-gray-500">Date: {formatDate(order.date)}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-sm font-medium text-blue-700">
                  {statusIcons[order.status]} {order.status}
                </span>
                <div className="font-bold text-green-600">{currency}{Number(order.total).toFixed(2)}</div>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedOrderId === order._id && (
              <div className="p-6 space-y-6 border-t border-gray-100 bg-white animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm">
                  <div><strong>Tracking Number:</strong> {order.trackingNumber || 'N/A'}</div>
                  <div><strong>Delivery Date:</strong> {order.deliveryDate ? formatDate(order.deliveryDate) : 'N/A'}</div>
                  <div className="flex items-center gap-2">
                    <strong>Current Status:</strong> {statusIcons[order.status]} {order.status}
                  </div>
                </div>

                {/* Items List */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Ordered Items</h3>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item._id} className="flex items-center p-3 border rounded-lg bg-gray-50 hover:bg-gray-100">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-gray-500">
                            Qty: {item.quantity} | Price: ${Number(item.price).toFixed(2)}
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
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full md:w-1/2 text-sm focus:ring-2 focus:ring-blue-400"
                    value={order.status}
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Order Confirmed">Order Confirmed</option>
                    <option value="Order Shipped">Order Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Timeline */}
                {order.timeline && order.timeline.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Order Timeline</h3>
                    <div className="space-y-4">
                      {order.timeline.map((event, idx) => (
                        <div key={idx} className="relative flex items-center gap-4 pl-6">
                          <div className="absolute w-4 h-4 bg-blue-400 rounded-full -left-2 top-1.5" />
                          <div className="flex flex-col">
                            <div className="text-gray-800 font-medium">{event.status}</div>
                            <div className="text-xs text-gray-400">{formatDate(event.date)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerOrders;
