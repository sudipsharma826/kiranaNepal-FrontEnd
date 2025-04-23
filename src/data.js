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
    tags: ['Compact', 'Waterproof', 'Outdoor']
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
  }
];