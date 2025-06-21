import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

function SidebarWithDarkMode({
  darkMode,
  toggleTheme,
  isAuthenticated,
  handleLogout,
  isSidebarOpen,
  toggleSidebar
}) {
  const navigate = useNavigate();

  const logoutAndRedirect = () => {
    localStorage.removeItem('isAuthenticated');
    setTimeout(() => {
      handleLogout();
      navigate('/');
    }, 10);
  };

  const navItem = (to, label, icon) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm font-medium 
         ${
           isActive
             ? 'bg-indigo-100 text-indigo-700 dark:bg-gray-700 dark:text-indigo-300'
             : 'text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
         }`
      }
    >
      <span>{icon}</span>
      {isSidebarOpen && <span>{label}</span>}
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

     {/* Navigation */}
<nav className="flex flex-col gap-3 mt-8 w-full px-2">
  {/* Always visible */}
  {navItem('/', 'Home', '🏠')}
  {navItem('/browse', 'Browse', '🔍')}
  {navItem('/aboutus', 'About Us', 'ℹ️')}

  {!isAuthenticated ? (
    <>
      {navItem('/login', 'Login', '🔐')}
    </>
  ) : (
    <>
      {navItem('/dashboard', 'Dashboard', '📊')}
      {navItem('/post', 'Post Item', '📤')}
      {navItem('/kyc', 'KYC', '🛂')}

      {/* Divider */}
      <div className="border-t border-gray-300 dark:border-gray-700 my-2" />

      <button
        onClick={logoutAndRedirect}
        className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-gray-800 transition"
      >
        <span>🚪</span>
        {isSidebarOpen && <span>Logout</span>}

      </button>
    </>
  )}
</nav>


      <div className="flex-grow" />

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="mb-6 mx-auto p-2 rounded-full hover:bg-indigo-100 dark:hover:bg-gray-700 transition"
        title="Toggle theme"
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
