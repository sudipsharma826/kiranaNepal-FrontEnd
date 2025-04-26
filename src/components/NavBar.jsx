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
          <NavLink
            to="/orders"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `${isActive ? 'text-indigo-600' : 'text-gray-700'} font-semibold hover:text-indigo-600 transition`
            }
          >
            My Orders
          </NavLink>
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
              <User className="w-5 h-5 text-gray-600" />
            </button>
            {showDropdown && (
              <ul className="absolute top-12 right-0 bg-white shadow-md border rounded-lg w-48 py-2 text-sm z-50 animate-fade-in">
                <li className="px-4 py-2 hover:bg-gray-50">Profile</li>
                <li
                onClick={()=> navigate('/orders')}
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
              <User className="w-5 h-5 text-gray-600" />
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
            <NavLink
              to="/orders"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 font-semibold hover:text-indigo-600 transition"
            >
              My Orders
            </NavLink>
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
