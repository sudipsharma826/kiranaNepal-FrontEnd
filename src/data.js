// Icon Imports
import {
  Laptop, Shirt, ShoppingBag, BedDouble, Smartphone,
  Utensils, Coffee, Pizza, Sandwich, Beef, Fish,
  Salad, IceCream, Soup, Star, ShoppingCart,
  Heart, ChevronDown, ChevronRight,
  SendToBack
} from 'lucide-react';

// Categories Data
export const categories = [
  {
    id: 1,
    name: 'Electronics',
    path: 'electronics',
    description: 'Latest gadgets and devices',
    icon: Laptop,
    items: 120,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000',
    color: 'from-indigo-500 to-blue-600'
  },
  {
    id: 2,
    name: 'Fashion',
    path: 'fashion',
    description: 'Trendy clothing and accessories',
    icon: Shirt,
    items: 95,
    image: 'https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?auto=format&fit=crop&q=80&w=1000',
    color: 'from-pink-500 to-purple-500'
  },
  {
    id: 3,
    name: 'Groceries',
    path: 'groceries',
    description: 'Daily essentials and food items',
    icon: ShoppingBag,
    items: 150,
    image: 'https://images.unsplash.com/photo-1580910051070-d8e7f14c4f98?auto=format&fit=crop&q=80&w=1000',
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 4,
    name: 'Home & Living',
    path: 'home-living',
    description: 'Furniture and home essentials',
    icon: BedDouble,
    items: 68,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000',
    color: 'from-yellow-500 to-orange-600'
  },
  {
    id: 5,
    name: 'Mobile Phones',
    path: 'mobile-phones',
    description: 'Smartphones and accessories',
    icon: Smartphone,
    items: 72,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=1000',
    color: 'from-red-500 to-rose-600'
  },
  {
    id: 6,
    name: 'Food & Beverages',
    path: 'food-beverages',
    description: 'Tasty meals and refreshing drinks',
    icon: Utensils,
    items: 86,
    image: 'https://images.unsplash.com/photo-1559628233-d8dcee29cdec?auto=format&fit=crop&q=80&w=1000',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 7,
    name: 'Beauty & Skincare',
    path: 'beauty-skincare',
    description: 'Top beauty and skincare products',
    icon: Heart,
    items: 58,
    image: 'https://images.unsplash.com/photo-1600180758890-6da8e3b0c847?auto=format&fit=crop&q=80&w=1000',
    color: 'from-rose-400 to-pink-600'
  },
  {
    id: 8,
    name: 'Kitchen Essentials',
    path: 'kitchen-essentials',
    description: 'Cookware, utensils, and more',
    icon: Soup,
    items: 43,
    image: 'https://images.unsplash.com/photo-1600185365129-70b2eb22c692?auto=format&fit=crop&q=80&w=1000',
    color: 'from-lime-500 to-green-500'
  },
  {
    id: 9,
    name: 'Gadgets',
    path: 'gadgets',
    description: 'Smart and tech gadgets',
    icon: Star,
    items: 38,
    image: 'https://images.unsplash.com/photo-1587574293340-d0540d6c9a50?auto=format&fit=crop&q=80&w=1000',
    color: 'from-gray-600 to-gray-900'
  },
  {
    id: 10,
    name: 'Accessories',
    path: 'accessories',
    description: 'Everyday fashion accessories',
    icon: ChevronDown,
    items: 60,
    image: 'https://images.unsplash.com/photo-1621391408629-68ef99df3db5?auto=format&fit=crop&q=80&w=1000',
    color: 'from-amber-400 to-orange-400'
  },
  {'id': 11,
    'name': 'Toys & Games',
    'path': 'toys-games',
    'description': 'Fun and educational toys for all ages',
    'icon': 'SendToBack',
    'items': 77,
    'image': 'https://images.unsplash.com/photo-1581578017421-04c41f68f4f8?auto=format&fit=crop&q=80&w=1000',
    'color': 'from-yellow-300 to-red-400'},
   {'id': 12,
    'name': 'Books & Stationery',
    'path': 'books-stationery',
    'description': 'Books, notebooks, and writing essentials',
    'icon': 'SendToBack',
    'items': 140,
    'image': 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1000',
    'color': 'from-blue-400 to-indigo-500'},
   {'id': 13,
    'name': 'Sports & Outdoors',
    'path': 'sports-outdoors',
    'description': 'Gear and accessories for outdoor fun',
    'icon': 'SendToBack',
    'items': 110,
    'image': 'https://images.unsplash.com/photo-1532274402917-5aadf881bdf9?auto=format&fit=crop&q=80&w=1000',
    'color': 'from-green-700 to-blue-700'},
   {'id': 14,
    'name': 'Automotive',
    'path': 'automotive',
    'description': 'Car accessories and tools',
    'icon': 'SendToBack',
    'items': 69,
    'image': 'https://images.unsplash.com/photo-1581574201193-0c02ba275823?auto=format&fit=crop&q=80&w=1000',
    'color': 'from-gray-700 to-black'},
   {'id': 15,
    'name': 'Pet Supplies',
    'path': 'pet-supplies',
    'description': 'Everything your pet needs',
    'icon': 'SendToBack',
    'items': 80,
    'image': 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&q=80&w=1000',
    'color': 'from-orange-300 to-yellow-500'},
   {'id': 16,
    'name': 'Office Supplies',
    'path': 'office-supplies',
    'description': 'Essentials for your workplace',
    'icon': 'SendToBack',
    'items': 55,
    'image': 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&q=80&w=1000',
    'color': 'from-blue-300 to-teal-500'},
   {'id': 17,
    'name': 'Health & Wellness',
    'path': 'health-wellness',
    'description': 'Supplements and wellness products',
    'icon': 'SendToBack',
    'items': 73,
    'image': 'https://images.unsplash.com/photo-1555448248-dc3e943a3f07?auto=format&fit=crop&q=80&w=1000',
    'color': 'from-green-300 to-lime-600'},
   {'id': 18,
    'name': 'Baby Products',
    'path': 'baby-products',
    'description': 'Products for newborns and toddlers',
    'icon': 'SendToBack',
    'items': 62,
    'image': 'https://images.unsplash.com/photo-1600118352200-d5fd3fa4c539?auto=format&fit=crop&q=80&w=1000',
    'color': 'from-pink-300 to-rose-500'},
   {'id': 19,
    'name': 'Gaming',
    'path': 'gaming',
    'description': 'Consoles, games, and accessories',
    'icon': 'SendToBack',
    'items': 95,
    'image': 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&q=80&w=1000',
    'color': 'from-indigo-800 to-purple-800'},
   {'id': 20,
    'name': 'Musical Instruments',
    'path': 'musical-instruments',
    'description': 'Instruments and audio equipment',
    'icon': 'SendToBack',
    'items': 35,
    'image': 'https://images.unsplash.com/photo-1549388604-817d15aa0110?auto=format&fit=crop&q=80&w=1000',
    'color': 'from-yellow-700 to-red-600'
  }
];

// Products Data
export const featuredproducts = [
  {
    id: 1,
    name: 'Wireless Earbuds',
    slug: 'wireless-earbuds',
    category: 'Electronics',
    price: 49.99,
    rating: 4.8,
    reviews: 421,
    image: 'https://images.unsplash.com/photo-1585386959984-a41552263cbd?auto=format&fit=crop&q=80&w=1000',
    description: 'High-quality wireless earbuds with noise cancellation and long battery life.',
    tags: ['Bestseller', 'New Arrival', 'Tech'],
    stock: 50,
  },
  {
    id: 2,
    name: 'Hydrating Face Cream',
    slug: 'face-cream',
    category: 'Beauty & Skincare',
    price: 19.99,
    rating: 4.7,
    reviews: 187,
    image: 'https://images.unsplash.com/photo-1600180758890-6da8e3b0c847?auto=format&fit=crop&q=80&w=1000',
    description: 'Moisturizing cream suitable for all skin types, enriched with natural ingredients.',
    tags: ['Top Rated', 'Natural', 'Vegan']
  },
  {
    id: 3,
    name: 'Stainless Steel Cookware Set',
    slug: 'cookware-set',
    slug: 'cookware-set',
    category: 'Kitchen Essentials',
    price: 89.99,
    rating: 4.6,
    reviews: 304,
    image: 'https://images.unsplash.com/photo-1600185365129-70b2eb22c692?auto=format&fit=crop&q=80&w=1000',
    description: 'Durable and stylish cookware set, ideal for everyday cooking.',
    tags: ['Durable', 'Popular', 'Family']
  },
  {
    id: 4,
    name: 'Portable Bluetooth Speaker',
    category: 'electronics',
    slug: 'bluetooth-speaker',
    price: 34.99,
    rating: 4.8,
    reviews: 256,
    image: 'https://images.unsplash.com/photo-1587574293340-d0540d6c9a50?auto=format&fit=crop&q=80&w=1000',
    description: 'Compact speaker with powerful sound and waterproof design.',
    tags: ['Compact', 'Waterproof', 'Outdoor'],
    stock: 20
  },
  {
    id: 5,
    name: 'Eco-Friendly Tote Bag',
    category: 'Accessories',
    slug: 'tote-bag',
    price: 14.99,
    rating: 4.5,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1621391408629-68ef99df3db5?auto=format&fit=crop&q=80&w=1000',
    description: 'Reusable shopping bag made from organic cotton, available in multiple colors.',
    tags: ['Eco-Friendly', 'Stylish', 'Reusable']
  },
  {
    id: 6,
    name: 'Smart Fitness Tracker',
    category: 'Mobile-Phones',
    slug: 'fitness-tracker',
    price: 59.99,
    rating: 4.9,
    reviews: 512,
    image: 'https://images.unsplash.com/photo-1585386959984-a41552263cbd?auto=format&fit=crop&q=80&w=1000',
    description: 'Track your fitness goals with this advanced smartwatch, featuring heart rate monitoring and GPS.',
    tags: ['Fitness', 'Smart', 'Health']
  },
  {
    id: 7,
    name: 'Noise-Cancelling Headphones',
    slug: 'noise-cancelling-headphones',
    category: 'Electronics',
    price: 129.99,
    rating: 4.7,
    reviews: 320,
    image: 'https://images.unsplash.com/photo-1580894908361-4a8b1b4e8c8f?auto=format&fit=crop&q=80&w=1000',
    description: 'Over-ear headphones with active noise cancellation and superior sound quality.',
    tags: ['Audio', 'Comfort', 'Travel'],
    stock: 35
  },
  {
    id: 8,
    name: 'Organic Cotton T-Shirt',
    slug: 'organic-cotton-tshirt',
    category: 'Fashion',
    price: 24.99,
    rating: 4.5,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1520975911093-56c2d1d6e0f4?auto=format&fit=crop&q=80&w=1000',
    description: 'Soft and breathable t-shirt made from 100% organic cotton.',
    tags: ['Eco-Friendly', 'Comfort', 'Casual'],
    stock: 80
  },
  {
    id: 9,
    name: 'Stainless Steel Water Bottle',
    slug: 'stainless-steel-water-bottle',
    category: 'Accessories',
    price: 19.99,
    rating: 4.6,
    reviews: 150,
    image: 'https://images.unsplash.com/photo-1580910051070-d8e7f14c4f',
    description: 'Insulated water bottle that keeps drinks cold for 24 hours and hot for 12 hours.',
    tags: ['Hydration', 'Travel', 'Eco-Friendly'],
    stock: 60
  },
  {
    id: 10,
    name: 'Leather Wallet',
    slug: 'leather-wallet',
    category: 'Fashion',
    price: 39.99,
    rating: 4.8,
    reviews: 275,
    image: 'https://images.unsplash.com/photo-1580910051070-d8e7f14c4f98?auto=format&fit=crop&q=80&w=1000',
    description: 'Genuine leather wallet with multiple card slots and a sleek design.',
    tags: ['Luxury', 'Gift', 'Fashion'],
    stock: 45
  }
];

// Static Address
export const addressdata = [
  '123 Main St, Kathmandu, Nepal',
  '456 Elm St, Pokhara, Nepal',
  '789 Maple Ave, Lalitpur, Nepal',
  '101 Oak St, Bhaktapur, Nepal',
  '202 Pine St, Biratnagar, Nepal',
  '303 Cedar St, Butwal, Nepal',
  '404 Birch St, Bharatpur, Nepal',
  '505 Walnut St, Janakpur, Nepal',
  '606 Chestnut St, Narayanghat, Nepal',
  '707 Spruce St, Hetauda, Nepal'
]

//Epxort order data
export const orders = [
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
  },
  {
    id: "ORD-2024-006",
    date: "2024-03-14",
    total: 100.98,
    status: "in-transit",
    deliveryDate: "2024-03-17",
    trackingNumber: "TRK987659321",
    items: [
      {
        id: 3,
        name: "Hello",
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
