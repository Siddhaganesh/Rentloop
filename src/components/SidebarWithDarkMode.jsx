import React, { useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Moon, Sun, LogOut, Home, Search, Info,
  UserPlus, UserCheck, FilePlus, LayoutDashboard
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

  useEffect(() => {
    if (isSidebarOpen) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => toggleSidebar(), 3000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isSidebarOpen, toggleSidebar]);

  const logoutAndRedirect = () => {
    localStorage.removeItem('isAuthenticated');
    setTimeout(() => {
      handleLogout();
      navigate('/');
    }, 10);
  };

  const navItem = (to, label, Icon) => (
    <NavLink
      to={to}
      title={!isSidebarOpen ? label : ''}
      className={({ isActive }) =>
        `group relative flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm font-medium ${
          isActive
            ? 'bg-indigo-100 text-indigo-700 dark:bg-gray-700 dark:text-indigo-300'
            : 'text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
        }`
      }
    >
      <Icon className="w-4 h-4" />
      {isSidebarOpen && <span>{label}</span>}
      {!isSidebarOpen && (
        <span className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition whitespace-nowrap z-50">
          {label}
        </span>
      )}
    </NavLink>
  );

  return (
    <motion.div
      animate={{ width: isSidebarOpen ? 240 : 64 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 h-screen bg-white dark:bg-gray-900 shadow-lg flex flex-col border-r border-gray-200 dark:border-gray-700 z-50"
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-4 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow hover:scale-105 z-50"
        title="Toggle sidebar"
      >
        {isSidebarOpen ? '<' : '>'}
      </button>

      {/* Title */}
      {isSidebarOpen && (
        <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-300 my-6 text-center">
          RentLoop
        </h2>
      )}

      <nav className="flex flex-col gap-3 mt-8 w-full px-2 text-sm">
        {/* Public */}
        <div className={`${isSidebarOpen ? 'mb-1 ml-3 text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide' : 'sr-only'}`}>Public</div>
        {navItem('/', 'Home', Home)}
        {navItem('/browse', 'Browse', Search)}
        {navItem('/aboutus', 'About Us', Info)}

        {/* Guest-only */}
        {!isAuthenticated && (
          <>
            <div className={`${isSidebarOpen ? 'mt-4 mb-1 ml-3 text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide' : 'sr-only'}`}>Account</div>
            {navItem('/login', 'Login', UserPlus)}
          </>
        )}

        {/* Authenticated user */}
        {isAuthenticated && (
          <>
            <div className={`${isSidebarOpen ? 'mt-4 mb-1 ml-3 text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide' : 'sr-only'}`}>Dashboard</div>
            {navItem('/dashboard', 'Dashboard', LayoutDashboard)}
            {navItem('/post', 'Post Item', FilePlus)}
            {navItem('/kyc', 'KYC', UserCheck)}

            {/* Logout */}
            <div className="border-t border-gray-200 dark:border-gray-700 my-3" />
            <button
              onClick={logoutAndRedirect}
              title={!isSidebarOpen ? 'Logout' : ''}
              className="group relative flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-gray-800 transition"
            >
              <LogOut className="w-4 h-4" />
              {isSidebarOpen && <span>Logout</span>}
              {!isSidebarOpen && (
                <span className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition whitespace-nowrap z-50">
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
        className="mb-6 mx-auto p-2 rounded-full hover:bg-indigo-100 dark:hover:bg-gray-700 transition"
      >
        {darkMode ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-gray-700" />
        )}
      </button>
    </motion.div>
  );
}

export default SidebarWithDarkMode;
