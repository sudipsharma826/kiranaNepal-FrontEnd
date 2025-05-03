import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import toast from 'react-hot-toast';

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
    getItemCount,
    axios,
  } = useAppContext();

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      const response = await axios.get('/api/user/logout');
      if (response.data.success) {
        setUser(null);
        toast.success('Logout successful!');
        setShowDropdown(false);
        setMenuOpen(false); // Close mobile menu on logout
        navigate('/');
      } else {
        toast.error('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('An error occurred during logout. Please try again.');
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLoginClick = (e) => {
    e.preventDefault();
    setShowUserLogin(true);
    setMenuOpen(false);
    setShowDropdown(false);
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
          <button
            onClick={() => navigate('/seller')}
            type="button"
            className="flex items-center gap-2.5 border border-gray-500/30 px-4 py-2 text-sm text-gray-800 rounded bg-white hover:text-cyan-500 hover:bg-cyan-500/10 hover:border-cyan-500/30 active:scale-95 transition"
          >
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

        {/* User Profile */}
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
                  onClick={() => {
                    setShowDropdown(false);
                    navigate('/orders');
                  }}
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  My Orders
                </li>
                <li
                  className="cursor-pointer px-4 py-2 text-red-500 hover:bg-gray-50 border-t mt-1"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex items-center gap-4">
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
                  onClick={() => {
                    setShowDropdown(false);
                    navigate('/orders');
                  }}
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  My Orders
                </li>
                <li
                  className="cursor-pointer px-4 py-2 text-red-500 hover:bg-gray-50 border-t mt-1"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        )}

        <button
          onClick={toggleMenu}
          className="text-gray-700 hover:text-indigo-600 focus:outline-none"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-white shadow-md z-40 py-5 px-5 sm:hidden">
          <div className="flex flex-col gap-4">
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
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
