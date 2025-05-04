import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Search, ShoppingCart, User, Menu, X, LogOut, User2, ShoppingBag } from 'lucide-react';
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
  const desktopDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      const response = await axios.get('/api/user/logout');
      if (response.data.success) {
        setUser(null);
        toast.success('Logout successful!');
        setShowDropdown(false);
        setMenuOpen(false);
        navigate('/');
      } else {
        toast.error('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('An error occurred during logout. Please try again.');
    }
  };

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

  const handleProfileClick = () => {
    navigate('/profile');
    setShowDropdown(false);
    setMenuOpen(false);
  };

  const handleOrdersClick = () => {
    navigate('/orders');
    setShowDropdown(false);
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target)) &&
        (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target))
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const UserDropdown = () => (
    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl bg-white/90 backdrop-blur-sm shadow-lg border border-gray-100 py-1 z-50 ring-1 ring-black ring-opacity-5 focus:outline-none animate-slideDown">
      <div className="border-b border-gray-100 pb-2 px-4 py-3">
        <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
      </div>
      <div className="py-1">
        <button
          onClick={handleProfileClick}
          className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          <User2 className="mr-3 h-5 w-5 text-gray-400 group-hover:text-indigo-500" />
          Profile
        </button>
        <button
          onClick={handleOrdersClick}
          className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          <ShoppingBag className="mr-3 h-5 w-5 text-gray-400 group-hover:text-indigo-500" />
          My Orders
        </button>
      </div>
      <div className="border-t border-gray-100 pt-1">
        <button
          onClick={handleLogout}
          className="group flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          <LogOut className="mr-3 h-5 w-5 text-red-400 group-hover:text-red-500" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className="flex items-center space-x-2">
            <img src="/logo.png" className="h-10 w-15" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Kirana Nepal
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['/', '/products', '/categories', '/offers'].map((path) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `${isActive ? 'text-indigo-600' : 'text-gray-700'} font-semibold hover:text-indigo-600 transition`
                }
              >
                {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
              </NavLink>
            ))}

            {/* Desktop Search */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden lg:flex items-center h-10 w-60 px-4 border border-gray-200 rounded-full bg-gray-50 focus-within:border-indigo-300 focus-within:ring-1 focus-within:ring-indigo-300"
            >
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="ml-2 flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
              />
            </form>

            {/* Cart */}
            <button
              onClick={() => navigate('/cart')}
              className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-full transition"
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-indigo-600 text-xs font-medium text-white">
                {getItemCount()}
              </span>
            </button>

            {/* Desktop User Dropdown */}
            {!user ? (
              <button
                onClick={handleLoginClick}
                className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            ) : (
              <div className="relative z-50" ref={desktopDropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {user.image ? (
                    <img src={user.image} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
                  ) : (
                    <User className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {showDropdown && <UserDropdown />}
              </div>
            )}
          </div>

          {/* Mobile Section */}
          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={() => navigate('/cart')}
              className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-full transition"
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-indigo-600 text-xs font-medium text-white">
                {getItemCount()}
              </span>
            </button>

            {!user ? (
              <button
                onClick={handleLoginClick}
                className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            ) : (
              <div className="relative z-50" ref={mobileDropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {user.image ? (
                    <img src={user.image} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
                  ) : (
                    <User className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {showDropdown && <UserDropdown />}
              </div>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md focus:ring-2 focus:ring-indigo-500"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (if open) */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 px-4 py-5 space-y-6">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center h-12 px-4 border border-gray-200 rounded-full bg-gray-50 focus-within:ring-indigo-300"
          >
            <Search className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="ml-2 flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </form>

          {['/', '/products', '/categories', '/offers'].map((path) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className="block text-base font-medium text-gray-700 hover:text-indigo-600"
            >
              {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
