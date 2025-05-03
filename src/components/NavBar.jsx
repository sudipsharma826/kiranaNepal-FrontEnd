import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';

const NavBar = () => {
  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    menuOpen,
    setMenuOpen,
    setSearchQuery,
    searchQuery,
    getItemCount
  } = useAppContext();
  console.log(user);

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    setUser(null);
    setShowDropdown(false);
    navigate('/');
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLoginClick = (e) => {
    e.preventDefault();
    setShowUserLogin(true);
    setMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/products');
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-200 px-5 sm:px-12 lg:px-20 py-3 flex items-center justify-between">
      {/* Logo */}
      <NavLink to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="w-28 h-16 object-contain" />
      </NavLink>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex items-center gap-8">
        {['/', '/products', '/categories', '/offers'].map((path, i) => (
          <NavLink
            key={i}
            to={path}
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `${isActive ? 'text-indigo-600' : 'text-gray-700'} font-semibold hover:text-indigo-600 transition`
            }
          >
            {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
          </NavLink>
        ))}

        {user && (
          // <NavLink
          //   to="/orders"
          //   onClick={() => setMenuOpen(false)}
          //   className={({ isActive }) =>
          //     `${isActive ? 'text-indigo-600' : 'text-gray-700'} font-semibold hover:text-indigo-600 transition`
          //   }
          // >
          //   My Orders
          // </NavLink>
          //Seller Login Btn
          <button
          onClick={()=> navigate('/seller')}
           type="button" class="flex items-center gap-2.5 border border-gray-500/30 px-4 py-2 text-sm text-gray-800 rounded bg-white hover:text-cyan-500 hover:bg-cyan-500/10 hover:border-cyan-500/30 active:scale-95 transition">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.13 14.652a.553.553 0 0 1-.78-.78l4.097-4.098a.552.552 0 0 1 .78.78zM5.882 6.95l-2.11 2.887s-.402-.343-1.224-.236C1.332 9.76.816 11.167.56 11.457.295 11.639-.553 9.829.555 8.16c1.872-2.815 5.327-1.21 5.327-1.21m5.169 5.168-2.887 2.11s.343.401.236 1.224c-.16 1.216-1.566 1.731-1.856 1.988-.182.265 1.629 1.112 3.295.005 2.817-1.872 1.212-5.327 1.212-5.327m5.303-6.198c.607-1.365.616-2.753-.07-3.686l.02-.02C17.375 1.145 18.129.16 17.986.018c-.142-.142-1.126.611-2.198 1.682l-.019.02c-.931-.685-2.32-.677-3.683-.071a13.3 13.3 0 0 0 1.895 2.374 13.3 13.3 0 0 0 2.373 1.898" fill="#06B6D4"/>
            <path d="M13.363 4.639a14.2 14.2 0 0 1-2.054-2.58 7 7 0 0 0-1.279 1.016c-1.314 1.314-6.163 7.728-6.163 7.728l.865.865 2.305-2.305a1.134 1.134 0 0 1 1.602 1.602L6.334 13.27l.865.865s6.414-4.849 7.728-6.163a7 7 0 0 0 1.018-1.283 14.2 14.2 0 0 1-2.582-2.05m-2.978 2.978A1.355 1.355 0 1 1 12.3 5.7a1.355 1.355 0 0 1-1.916 1.917" fill="#06B6D4"/>
        </svg>
        Seller Login
    </button>
          
        )}

        {/* Search */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden lg:flex items-center gap-2 border px-4 py-2 rounded-full bg-gray-50 hover:bg-gray-100"
        >
          <Search className="w-4 h-4 text-gray-500" />
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-sm"
          />
        </form>

        {/* Cart */}
        <div
          onClick={() => {
            navigate('/cart');
            setMenuOpen(false);
          }}
          className="relative cursor-pointer hover:text-indigo-600"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {getItemCount()}
          </span>
        </div>

        {/* User */}
        {!user ? (
          <button
            onClick={handleLoginClick}
            className="px-6 py-2.5 bg-indigo-500 text-white font-medium rounded-full hover:bg-indigo-600 transition"
          >
            Login
          </button>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
            >
              {user?.image ? (
                <img src={user.image} alt={user.name} className="w-full h-full rounded-full" />
              ) : (
              <User className="w-5 h-5 text-gray-600" />
              )}
            </button>
            {showDropdown && (
              <ul className="absolute top-12 right-0 bg-white shadow-md border rounded-lg w-48 py-2 text-sm z-50 animate-fade-in">
                <li className="px-4 py-2 hover:bg-gray-50">Profile</li>
                <li
                onClick={()=> navigate('/orders')}
                 className="px-4 py-2 hover:bg-gray-50">My Orders</li>
                <li
                  className=" cursor-pointer px-4 py-2 text-red-500 hover:bg-gray-50 border-t mt-1"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Mobile Icons */}
      <div className="sm:hidden flex items-center gap-5">
        {/* Cart Icon */}
        <div
          onClick={() => {
            navigate('/cart');
            setMenuOpen(false);
          }}
          className="relative cursor-pointer text-gray-700 hover:text-indigo-600"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {getItemCount()}
          </span>
        </div>

        {/* User Icon */}
        <div className="cursor-pointer text-gray-700 hover:text-indigo-600">
          {!user ? (
            <button
            onClick={handleLoginClick}
            className="w-full py-3 text-gray-700 font-semibold rounded-lg"
          >
            Login
          </button>
          ) : (
            <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
            >
              {user?.image ? (
                <img src={user.image} alt={user.name} className="w-full h-full rounded-full" />
              ) : (
              <User className="w-5 h-5 text-gray-600" />
              )}
            </button>
            {showDropdown && (
              <ul className="absolute top-12 right-0 bg-white shadow-md border rounded-lg w-48 py-2 text-sm z-50 animate-fade-in">
                <li className="px-4 py-2 hover:bg-gray-50">Profile</li>
                <li 
                onClick={()=>navigate('/orders')}
                className="px-4 py-2 hover:bg-gray-50">My Orders</li>
                <li
                  className="px-4 py-2 text-red-500 hover:bg-gray-50 border-t mt-1"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
          )}
        </div>

        {/* Menu Toggle */}
        <button onClick={toggleMenu} className="p-2 rounded-lg hover:bg-gray-100">
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-[73px] left-0 w-full h-[calc(100vh-73px)] bg-white shadow-lg transition-transform duration-300 sm:hidden z-40 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col p-6 space-y-6">
          {/* Search */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 border px-4 py-2 rounded-full bg-gray-50">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent outline-none text-sm"
              type="text"
              placeholder="Search"
            />
          </form>

          {/* Nav Links */}
          {['/', '/products', '/categories', '/offers'].map((path, i) => (
            <NavLink
              key={i}
              to={path}
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 font-semibold hover:text-indigo-600 transition"
            >
              {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
            </NavLink>
          ))}

          {user && (
            <>
            <NavLink
              to="/orders"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 font-semibold hover:text-indigo-600 transition"
            >
              My Orders
            </NavLink>
           
            </>
          )}

          {/* Auth Buttons */}
          {!user ? (
            <button
              onClick={handleLoginClick}
              className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
