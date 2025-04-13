import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';

const NavBar = () => {
    const { user, setUser, setShowUserLogin, navigate, menuOpen, setMenuOpen } = useAppContext();

    const handleLogout = async () => {
        setUser(null);
        navigate('/');
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 bg-white border-b border-gray-200 shadow-sm transition-all duration-300">
            <NavLink to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
                <img src="/logo.png" alt="Logo" className="w-32 h-15" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to="/" className={({ isActive }) => 
                    `${isActive ? 'text-indigo-500' : 'text-gray-700'} font-medium hover:text-indigo-500 transition-colors`
                }>Home</NavLink>
                <NavLink to="/products" className={({ isActive }) => 
                    `${isActive ? 'text-indigo-500' : 'text-gray-700'} font-medium hover:text-indigo-500 transition-colors`
                }>Products</NavLink>
                <NavLink to="/categories" className={({ isActive }) => 
                    `${isActive ? 'text-indigo-500' : 'text-gray-700'} font-medium hover:text-indigo-500 transition-colors`
                }>Categories</NavLink>
                <NavLink to="/offers" className={({ isActive }) => 
                    `${isActive ? 'text-indigo-500' : 'text-gray-700'} font-medium hover:text-indigo-500 transition-colors`
                }>Offers</NavLink>
                {user && (
                    <NavLink to="/orders" className={({ isActive }) => 
                        `${isActive ? 'text-indigo-500' : 'text-gray-700'} font-medium hover:text-indigo-500 transition-colors`
                    }>My Orders</NavLink>
                )}

                <div className="hidden lg:flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors">
                    <Search className="w-4 h-4 text-gray-500" />
                    <input 
                        className="w-full bg-transparent outline-none placeholder-gray-500 text-sm"
                        type="text"
                        placeholder="Search products"
                    />
                </div>

                <div 
                    onClick={() => {
                        navigate('/cart');
                        setMenuOpen(false);
                    }}
                    className="relative cursor-pointer hover:text-indigo-500 transition-colors"
                >
                    <ShoppingCart className="w-6 h-6" />
                    <span className="absolute -top-2 -right-2 text-xs text-white bg-indigo-500 w-5 h-5 rounded-full flex items-center justify-center">1</span>
                </div>

                {!user ? (
                    <button 
                        onClick={() => setShowUserLogin(true)}
                        className="px-8 py-2.5 bg-indigo-500 hover:bg-indigo-600 transition-colors text-white rounded-full font-medium shadow-md hover:shadow-lg"
                    >
                        Login
                    </button>
                ) : (
                    <div className="relative group">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors">
                            <User className="w-5 h-5 text-gray-600" />
                        </div>
                        <ul className="hidden group-hover:block absolute top-12 right-0 bg-white shadow-lg border border-gray-100 py-2 w-48 rounded-lg text-sm z-50">
                            <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Profile
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer">Settings</li>
                            <li className="border-t border-gray-100 mt-2 pt-2 px-4 py-2 hover:bg-gray-50 cursor-pointer text-red-500" onClick={handleLogout}>
                                Logout
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
                onClick={toggleMenu}
                className="sm:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Menu"
            >
                <Menu className="w-6 h-6 text-gray-700" />
            </button>

            {/* Mobile Menu */}
            <div className={`${menuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} fixed top-[73px] left-0 w-full h-[calc(100vh-73px)] bg-white shadow-xl transition-all duration-300 sm:hidden z-50`}>
                <div className="flex flex-col p-6 space-y-6">
                    <div className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full bg-gray-50">
                        <Search className="w-4 h-4 text-gray-500" />
                        <input 
                            className="w-full bg-transparent outline-none placeholder-gray-500 text-sm"
                            type="text"
                            placeholder="Search products"
                        />
                    </div>
                    
                    <NavLink to="/" onClick={() => setMenuOpen(false)} className="text-gray-700 font-medium">Home</NavLink>
                    <NavLink to="/products" onClick={() => setMenuOpen(false)} className="text-gray-700 font-medium">Products</NavLink>
                    <NavLink to="/categories" onClick={() => setMenuOpen(false)} className="text-gray-700 font-medium">Categories</NavLink>
                    <NavLink to="/offers" onClick={() => setMenuOpen(false)} className="text-gray-700 font-medium">Offers</NavLink>
                    {user && (
                        <NavLink to="/orders" onClick={() => setMenuOpen(false)} className="text-gray-700 font-medium">My Orders</NavLink>
                    )}
                    
                    {!user ? (
                        <button 
                            onClick={() => {
                                setMenuOpen(false);
                                setShowUserLogin(true);
                            }}
                            className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 transition-colors text-white rounded-lg font-medium text-center"
                        >
                            Login
                        </button>
                    ) : (
                        <button 
                            onClick={() => {
                                setMenuOpen(false);
                                handleLogout();
                            }}
                            className="w-full py-3 bg-red-500 hover:bg-red-600 transition-colors text-white rounded-lg font-medium text-center"
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