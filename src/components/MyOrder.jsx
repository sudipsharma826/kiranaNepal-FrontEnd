import React from 'react';
import { Timer, CheckCircle, XCircle, Bike, IndianRupee } from 'lucide-react';

const demoOrders = [
  {
    id: 'ORD1234',
    foodName: 'Chicken Mo:Mo',
    quantity: 2,
    price: 400,
    status: 'Pending',
    date: '2025-04-13',
    image: 'https://source.unsplash.com/400x300/?momo',
  },
  {
    id: 'ORD1235',
    foodName: 'Paneer Pizza',
    quantity: 1,
    price: 550,
    status: 'Delivered',
    date: '2025-04-12',
    image: 'https://source.unsplash.com/400x300/?pizza',
  },
  {
    id: 'ORD1236',
    foodName: 'Sushi Set',
    quantity: 3,
    price: 1200,
    status: 'On The Way',
    date: '2025-04-13',
    image: 'https://source.unsplash.com/400x300/?sushi',
  },
];

const statusColors = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Delivered: 'bg-green-100 text-green-800',
  'On The Way': 'bg-blue-100 text-blue-800',
  Cancelled: 'bg-red-100 text-red-800',
};

const MyOrder = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-10">🛒 My Orders</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {demoOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
            <img src={order.image} alt={order.foodName} className="w-full h-48 object-cover" />
            <div className="p-5 space-y-3">
              <h2 className="text-xl font-semibold text-gray-800">{order.foodName}</h2>
              <p className="text-gray-600 text-sm">Order ID: <span className="font-medium">{order.id}</span></p>
              <p className="text-gray-600 text-sm">Date: {order.date}</p>
              <p className="text-gray-600 text-sm">Quantity: {order.quantity}</p>

              <div className="flex justify-between items-center">
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[order.status]}`}>
                  {order.status}
                </div>
                <div className="text-xl font-bold text-indigo-600 flex items-center gap-1">
                  <IndianRupee className="w-4 h-4" /> {order.price}
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium">
                  Make Payment
                </button>
                <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium">
                  Cancel Order
                </button>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium">
                  Track Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrder;
