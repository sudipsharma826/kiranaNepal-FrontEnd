import { Link, NavLink, Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import React from "react";

const LayoutSeller = () => {
  const { setIsSeller, setUser } = useAppContext();

  const dashboardicon = (
    <svg className="w-6 h-6 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Zm16 14a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2ZM4 13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6Zm16-2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6Z" />
    </svg>
  );

  const overviewicon = (
    <svg className="w-6 h-6 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M7.111 20A3.111 3.111 0 0 1 4 16.889v-12C4 4.398 4.398 4 4.889 4h4.444a.89.89 0 0 1 .89.889v12A3.111 3.111 0 0 1 7.11 20Zm0 0h12a.889.889 0 0 0 .889-.889v-4.444a.889.889 0 0 0-.889-.89h-4.389a.889.889 0 0 0-.62.253l-3.767 3.665a.933.933 0 0 0-.146.185c-.868 1.433-1.581 1.858-3.078 2.12Zm0-3.556h.009m7.933-10.927 3.143 3.143a.889.889 0 0 1 0 1.257l-7.974 7.974v-8.8l3.574-3.574a.889.889 0 0 1 1.257 0Z" />
    </svg>
  );

  const chaticon = (
    <svg className="w-6 h-6 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.616a1 1 0 0 0-.67.257l-2.88 2.592A.5.5 0 0 1 8 18.477V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
    </svg>
  );

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: dashboardicon },
    { name: "Product List", path: "/seller/product_list", icon: overviewicon },
    { name: "Orders", path: "/seller/orders", icon: chaticon },
  ];

  const logout = async () => {
    setIsSeller(false);
    setUser(null);
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-10 py-4 border-b bg-white shadow-sm">
        <Link to="/seller" className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
          <img className="h-10 ml-10 w-30" src="/logo.png" alt="dummyLogoColored" />
        </Link>
        <div class="flex items-center space-x-2.5 border border-blue-500/30 rounded-full bg-blue-500/20 p-1 text-sm text-blue-600">
    <div class="flex items-center space-x-1 bg-blue-500 text-white border border-blue-500 rounded-3xl px-3 pl-1 py-1">
        <img class="h-6 w-6 rounded-full" src="/developer.jpeg" alt="Sudip Sharma" />
        <p>Sudip Sharma</p>
    </div>
    <p class="pr-3">E-Commerce Project - KiranaNepal</p>
</div>
        <div className="flex items-center gap-4 text-gray-600">
          <p className="text-sm md:text-base">Hi, Admin</p>
          <button onClick={logout} className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm hover:brightness-110 transition-all duration-300 shadow-md">
            Logout
          </button>
        </div>
      </div>

      <div className="flex flex-col md:w-64 w-20 bg-white border-r h-screen pt-6 pb-4 overflow-y-auto shadow-inner">
        {sidebarLinks.map((item) => ( // <-- CORRECTED (added index)
          <NavLink
          to={item.path}
          key={item.name}
          end={item.path === "/seller"}
          className={({ isActive }) =>
            `flex items-center py-3 px-4 gap-4 mx-2 rounded-lg transition-all duration-300 mb-2 group
            ${isActive ? "bg-indigo-100 text-indigo-600 font-semibold" : "hover:bg-indigo-50 hover:text-indigo-600 text-gray-700"}
          `}
        >
        
            <div className="group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>
            <p className="md:block hidden">{item.name}</p>
          </NavLink>
        ))}
      </div>
      <Outlet />
    </>
  );
};

export default LayoutSeller;
