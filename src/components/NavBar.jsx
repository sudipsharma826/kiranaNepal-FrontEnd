import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';

const NavBar = () => {
    const {
        user,
        setUser,
        setShowUserLogin,
        navigate,
        menuOpen,
        setMenuOpen,
        setSearchQuery,
        searchQuery
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
        if (searchQuery.trim().length > 0) {
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
        <nav className="sticky top-0 z-30 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 bg-white border-b border-gray-200 shadow-sm transition-all duration-300">
            <NavLink to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
                <img src="/logo.png" alt="Logo" className="w-32 h-20 object-contain" />
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center gap-8">
                {['/', '/products', '/categories', '/offers'].map((path, index) => (
                    <NavLink
                        key={index}
                        to={path}
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                            `${isActive ? 'text-indigo-600' : 'text-gray-700'} font-medium hover:text-indigo-600 transition`
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
                            `${isActive ? 'text-indigo-600' : 'text-gray-700'} font-medium hover:text-indigo-600 transition`
                        }
                    >
                        My Orders
                    </NavLink>
                )}

                {/* Search Bar */}
                <form
                    onSubmit={handleSearchSubmit}
                    className="hidden lg:flex items-center gap-2 border px-4 py-2 rounded-full bg-gray-50 hover:bg-gray-100 transition"
                >
                    <Search className="w-4 h-4 text-gray-500" />
                    <input
                        onChange={(e) => setSearchQuery(e.target.value)}
                        
                        type="text"
                        placeholder="Search products"
                        className="w-full bg-transparent outline-none placeholder-gray-500 text-sm"
                    />
                </form>

                {/* Cart */}
                <div
                    onClick={() => {
                        navigate('/cart');
                        setMenuOpen(false);
                    }}
                    className="relative cursor-pointer hover:text-indigo-600 transition"
                >
                    <ShoppingCart className="w-6 h-6" />
                    <span className="absolute -top-2 -right-2 text-xs text-white bg-indigo-500 w-5 h-5 rounded-full flex items-center justify-center">
                        1
                    </span>
                </div>

                {/* User Icon */}
                {!user ? (
                    <NavLink
                        onClick={handleLoginClick}
                        className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full font-medium shadow-md"
                    >
                        Login
                    </NavLink>
                ) : (
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
                        >
                            <User className="w-5 h-5 text-gray-600" />
                        </button>

                        {showDropdown && (
                            <ul className="absolute top-12 right-0 bg-white shadow-lg border border-gray-100 py-2 w-48 rounded-lg text-sm z-50">
                                <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Profile
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer">Settings</li>
                                <li
                                    className="border-t border-gray-100 mt-2 pt-2 px-4 py-2 hover:bg-gray-50 cursor-pointer text-red-500"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </li>
                            </ul>
                        )}
                    </div>
                )}
            </div>

            {/* Mobile Menu Icon */}
            <button
                onClick={toggleMenu}
                className="sm:hidden p-2 hover:bg-gray-100 rounded-lg transition"
                aria-label="Menu"
            >
                <Menu className="w-6 h-6 text-gray-700" />
            </button>

            {/* Mobile Sidebar */}
            <div className={`${menuOpen ? 'translate-x-0' : '-translate-x-full'} fixed top-[73px] left-0 w-full h-[calc(100vh-73px)] bg-white shadow-xl transition-transform duration-300 sm:hidden z-50`}>
                <div className="flex flex-col p-6 space-y-6">
                    <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 border px-4 py-2 rounded-full bg-gray-50">
                        <Search className="w-4 h-4 text-gray-500" />
                        <input
                            onChange={(e) => setSearchQuery(e.target.value)}
                            
                            className="w-full bg-transparent outline-none placeholder-gray-500 text-sm"
                            type="text"
                            placeholder="Search products"
                        />
                    </form>

                    {['/', '/products', '/categories', '/offers'].map((path, index) => (
                        <NavLink
                            key={index}
                            to={path}
                            onClick={() => setMenuOpen(false)}
                            className="text-gray-700 font-medium"
                        >
                            {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                        </NavLink>
                    ))}

                    {user && (
                        <NavLink
                            to="/orders"
                            onClick={() => setMenuOpen(false)}
                            className="text-gray-700 font-medium"
                        >
                            My Orders
                        </NavLink>
                    )}

                    {!user ? (
                        <NavLink
                            onClick={handleLoginClick}
                            className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium text-center"
                        >
                            Login
                        </NavLink>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium text-center"
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
