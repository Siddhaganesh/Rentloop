import React, { useEffect, useRef } from 'react';
import { NavLink, useNavigate, useMatch } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Moon, Sun, LogOut, Home, Search, Info,
  UserPlus, UserCheck, FilePlus, LayoutDashboard,
  Menu, ChevronLeft, ChevronRight
} from 'lucide-react';

function SidebarWithDarkMode({
  darkMode,
  toggleTheme,
  isAuthenticated,
  handleLogout,
  isSidebarOpen,
  toggleSidebar
}) {
  const navigate = useNavigate();
  const timerRef = useRef(null);

  // The timer logic has been simplified for clarity and to remove the warning.
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const logoutAndRedirect = () => {
    localStorage.removeItem('isAuthenticated');
    setTimeout(() => {
      handleLogout();
      navigate('/');
    }, 10);
  };

  // FIXED: The navigation item logic is now a separate component
  // which uses `useMatch` to correctly determine if a link is active.
  const NavItem = ({ to, label, Icon }) => {
    const match = useMatch(to);
    const isActive = !!match;

    return (
      <NavLink
        to={to}
        title={!isSidebarOpen ? label : ''}
        className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
          isActive
            ? 'bg-gradient-to-r from-indigo-500 to-indigo-700 text-white shadow-md'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
      >
        <motion.div
          animate={{ scale: isActive ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Icon className="w-5 h-5" />
        </motion.div>
        {isSidebarOpen && <span className="truncate">{label}</span>}
        {!isSidebarOpen && (
          <span className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs rounded-md px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-50">
            {label}
          </span>
        )}
      </NavLink>
    );
  };

  return (
    <motion.div
      animate={{ width: isSidebarOpen ? 260 : 80 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 h-screen bg-white dark:bg-gray-950 shadow-2xl flex flex-col border-r border-gray-100 dark:border-gray-800 z-50"
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-5 top-8 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 z-50"
        title="Toggle sidebar"
      >
        {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
      </button>

      {/* Title/Logo Section */}
      <div className={`mt-8 mb-4 flex items-center justify-center`}>
        {isSidebarOpen ? (
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
            RentLoop
          </h2>
        ) : (
          <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-xl shadow-lg">
            <Menu className="w-6 h-6 text-white" />
          </div>
        )}
      </div>

      <nav className="flex flex-col gap-2 mt-12 w-full px-4 text-sm">
        {/* Public Navigation */}
        <div className={`${isSidebarOpen ? 'mb-1 ml-3 text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider' : 'sr-only'}`}>Public</div>
        <NavItem to="/" label="Home" Icon={Home} />
        <NavItem to="/browse" label="Browse" Icon={Search} />
        <NavItem to="/aboutus" label="About Us" Icon={Info} />

        {/* Guest-only */}
        {!isAuthenticated && (
          <>
            <div className={`${isSidebarOpen ? 'mt-4 mb-1 ml-3 text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider' : 'sr-only'}`}>Account</div>
            <NavItem to="/login" label="Login / Register" Icon={UserPlus} />
          </>
        )}

        {/* Authenticated user */}
        {isAuthenticated && (
          <>
            <div className={`${isSidebarOpen ? 'mt-4 mb-1 ml-3 text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider' : 'sr-only'}`}>Dashboard</div>
            <NavItem to="/dashboard" label="Dashboard" Icon={LayoutDashboard} />
            <NavItem to="/post" label="Post Item" Icon={FilePlus} />
            <NavItem to="/kyc" label="KYC" Icon={UserCheck} />

            {/* Logout */}
            <div className="border-t border-gray-200 dark:border-gray-800 my-4" />
            <button
              onClick={logoutAndRedirect}
              title={!isSidebarOpen ? 'Logout' : ''}
              className="group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-800"
            >
              <LogOut className="w-5 h-5" />
              {isSidebarOpen && <span>Logout</span>}
              {!isSidebarOpen && (
                <span className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs rounded-md px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-50">
                  Logout
                </span>
              )}
            </button>
          </>
        )}
      </nav>

      <div className="flex-grow" />

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        title="Toggle theme"
        className="mb-6 mx-auto p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-300"
      >
        <motion.div whileTap={{ scale: 0.9 }}>
          {darkMode ? (
            <Sun className="w-6 h-6 text-yellow-400" />
          ) : (
            <Moon className="w-6 h-6 text-gray-700" />
          )}
        </motion.div>
      </button>
    </motion.div>
  );
}

export default SidebarWithDarkMode;