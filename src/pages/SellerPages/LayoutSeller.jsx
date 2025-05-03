import { Link, NavLink, Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import React from "react";
import toast from "react-hot-toast";
import { LayoutDashboardIcon } from "lucide-react";

const LayoutSeller = () => {
  const { setIsSeller, setUser,navigate ,axios} = useAppContext();

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
    { name: "Product List", path: "/seller", icon: overviewicon },
    { name: "Orders", path: "/seller/orders", icon: chaticon },
    { name:"Categories", path:"/seller/categories", icon: dashboardicon }
  ];

// Handle logout
  const handleLogOut = async () => {
    try {
      const response = await axios.get("/api/seller/logout", { withCredentials: true });
      const { message } = response.data;
      if (response.data.success) {
        setIsSeller(false);
        setUser(null);
        toast.success(message);
      }
    } catch (error) {
      const message = error.response?.data?.message;
      if(error.response && error.response.status === 401) {
        toast.error(message);
      } else {
      toast.error("Logout failed. Please try again.");
      }
    }
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
        <button
          onClick={()=> navigate('/')}
           type="button" class="flex items-center gap-2.5 border border-gray-500/30 px-4 py-2 text-sm text-gray-800 rounded bg-white hover:text-cyan-500 hover:bg-cyan-500/10 hover:border-cyan-500/30 active:scale-95 transition">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.13 14.652a.553.553 0 0 1-.78-.78l4.097-4.098a.552.552 0 0 1 .78.78zM5.882 6.95l-2.11 2.887s-.402-.343-1.224-.236C1.332 9.76.816 11.167.56 11.457.295 11.639-.553 9.829.555 8.16c1.872-2.815 5.327-1.21 5.327-1.21m5.169 5.168-2.887 2.11s.343.401.236 1.224c-.16 1.216-1.566 1.731-1.856 1.988-.182.265 1.629 1.112 3.295.005 2.817-1.872 1.212-5.327 1.212-5.327m5.303-6.198c.607-1.365.616-2.753-.07-3.686l.02-.02C17.375 1.145 18.129.16 17.986.018c-.142-.142-1.126.611-2.198 1.682l-.019.02c-.931-.685-2.32-.677-3.683-.071a13.3 13.3 0 0 0 1.895 2.374 13.3 13.3 0 0 0 2.373 1.898" fill="#06B6D4"/>
            <path d="M13.363 4.639a14.2 14.2 0 0 1-2.054-2.58 7 7 0 0 0-1.279 1.016c-1.314 1.314-6.163 7.728-6.163 7.728l.865.865 2.305-2.305a1.134 1.134 0 0 1 1.602 1.602L6.334 13.27l.865.865s6.414-4.849 7.728-6.163a7 7 0 0 0 1.018-1.283 14.2 14.2 0 0 1-2.582-2.05m-2.978 2.978A1.355 1.355 0 1 1 12.3 5.7a1.355 1.355 0 0 1-1.916 1.917" fill="#06B6D4"/>
        </svg>
        Home Page
    </button>
        <div className="flex items-center gap-4 text-gray-600">
          <p className="text-sm md:text-base">Hi, Admin</p>
          <button
            onClick={handleLogOut}
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
