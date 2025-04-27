import { Link, NavLink, Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import React from "react";

const LayoutSeller = () => {
  const { setIsSeller, setUser } = useAppContext();

  const dashboardicon = (
    <svg className="w-6 h-6 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Zm16 14a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2ZM4 13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6Zm16-2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6Z" />
    </svg>
  );

  const overviewicon = (
    <svg className="w-6 h-6 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M7.111 20A3.111 3.111 0 0 1 4 16.889v-12C4 4.398 4.398 4 4.889 4h4.444a.89.89 0 0 1 .89.889v12A3.111 3.111 0 0 1 7.11 20Zm0 0h12a.889.889 0 0 0 .889-.889v-4.444a.889.889 0 0 0-.889-.89h-4.389a.889.889 0 0 0-.62.253l-3.767 3.665a.933.933 0 0 0-.146.185c-.868 1.433-1.581 1.858-3.078 2.12Zm0-3.556h.009m7.933-10.927 3.143 3.143a.889.889 0 0 1 0 1.257l-7.974 7.974v-8.8l3.574-3.574a.889.889 0 0 1 1.257 0Z" />
    </svg>
  );

  const chaticon = (
    <svg className="w-6 h-6 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.616a1 1 0 0 0-.67.257l-2.88 2.592A.5.5 0 0 1 8 18.477V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
    </svg>
  );

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: dashboardicon },
    { name: "Product List", path: "/seller/product_list", icon: overviewicon },
    { name: "Orders", path: "/seller/orders", icon: chaticon },
  ];

  const logout = () => {
    setIsSeller(false);
    setUser(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
        <Link to="/seller" className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
          <img className="h-10 w-auto" src="/logo.png" alt="Logo" />
        </Link>

        <div className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-blue-600 text-sm">
          <div className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-full">
            <img className="h-6 w-6 rounded-full" src="/developer.jpeg" alt="Developer" />
            <p className="hidden sm:block">Sudip Sharma</p>
          </div>
          <p className="hidden md:block">E-Commerce Project - KiranaNepal</p>
        </div>

        <div className="flex items-center gap-4 text-gray-600">
          <p className="text-sm md:text-base">Hi, Admin</p>
          <button
            onClick={logout}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm hover:brightness-110 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="bg-white w-20 md:w-64 border-r overflow-y-auto transition-all duration-300">
          <nav className="flex flex-col p-4">
            {sidebarLinks.map((item) => (
              <NavLink
                to={item.path}
                key={item.name}
                end={item.path === "/seller"}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-3 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all mb-2
                   ${isActive ? "bg-indigo-100 text-indigo-600 font-semibold" : ""}`
                }
              >
                <span className="w-6 h-6">{item.icon}</span>
                <span className="hidden md:block">{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutSeller;
