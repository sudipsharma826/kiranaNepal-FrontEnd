import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';

const NavBar = () => {
    const [open, setOpen] = React.useState(false);
    const { user, setUser, setShowUserLogin, navigate } = useAppContext();

    const handleLogout = async () => {
        setUser(null);
        navigate('/');
    };

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <NavLink to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                <img src="/logo.png" alt="Logo" className="w-32 h-15" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to="/" className="text-indigo-500 font-semibold">Home</NavLink>
                <NavLink to="/products" className="text-gray-700 hover:text-indigo-500">Products</NavLink>
                <NavLink to="/categories" className="text-gray-700 hover:text-indigo-500">Categories</NavLink>
                <NavLink to="/offers" className="text-gray-700 hover:text-indigo-500">Offers</NavLink>
                {user &&
                    <NavLink to="/orders" className="text-gray-700 hover:text-indigo-500">My Orders</NavLink>
                }

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.836 10.615 15 14.695" stroke="#7A7B7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path clipRule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="#7A7B7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <div onClick={()=>{
                    navigate('/cart')
                    setOpen(false)
                }}className="relative cursor-pointer">
                    <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#615fff" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">1</button>
                </div>

                {!user ? (
                    <button onClick={() => setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
                        Login
                    </button>
                ) : (
                    <div className="relative group">
                        <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="User" className="w-10 h-10 rounded-full cursor-pointer" />
                        <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40'>
                            <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>Profile</li>
                            <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>Settings</li>
                            <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={handleLogout}>Logout</li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Mobile Menu Toggle */}
            <button onClick={() => setOpen(!open)} aria-label="Menu" className="sm:hidden">
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="21" height="1.5" rx=".75" fill="#426287" />
                    <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                    <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                </svg>
            </button>

            {/* Mobile Menu */}
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <NavLink to="/" onClick={() => setOpen(false)} className="text-indigo-500 font-semibold">Home</NavLink>
                <NavLink to="/products" onClick={() => setOpen(false)} className="text-gray-700 hover:text-indigo-500">Products</NavLink>
                <NavLink to="/categories" onClick={() => setOpen(false)} className="text-gray-700 hover:text-indigo-500">Categories</NavLink>
                <NavLink to="/offers" onClick={() => setOpen(false)} className="text-gray-700 hover:text-indigo-500">Offers</NavLink>
                {user &&
                    <NavLink to="/orders" onClick={() => setOpen(false)} className="text-gray-700 hover:text-indigo-500">My Orders</NavLink>
                }
                {!user ? (
                    <button onClick={() => {
                        setOpen(false);
                        setShowUserLogin(true);
                    }} className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">
                        Login
                    </button>
                ) : (
                    <button onClick={() => {
                        setOpen(false);
                        handleLogout();
                    }} className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">
                        Logout
                    </button>
                )}
            </div>

        </nav>
    );
};

export default NavBar;
