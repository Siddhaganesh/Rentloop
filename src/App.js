import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './components/Home';
import SidebarWithDarkMode from './components/SidebarWithDarkMode';
import Login from './components/Login';
import Browse from './components/Browse';
import PostItem from './components/PostItem';
import Dashboard from './components/Dashboard';
import ReportItem from './components/ReportItem';
import KYCPage from './components/KYCPage';
import AboutUs from './components/AboutUs';

import './index.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  const [isSidebarOpen, setSidebarOpen] = useState(true); // NEW STATE

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setTimeout(() => {
      setIsAuthenticated(false);
    }, 10);
  };

  const RequireAuth = ({ children }) =>
    isAuthenticated ? children : <Navigate to="/login" replace />;

  return (
    <Router>
      <div className="flex">
        <SidebarWithDarkMode
          darkMode={darkMode}
          toggleTheme={toggleTheme}
          isAuthenticated={isAuthenticated}
          handleLogout={handleLogout}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setSidebarOpen(prev => !prev)}
        />

        <main
          className={`transition-all duration-300 min-h-screen flex-1 p-6 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${
            isSidebarOpen ? 'ml-60' : 'ml-16'
          }`}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Login handleLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard handleLogout={handleLogout} />
                </RequireAuth>
              }
            />
            <Route path="/browse" element={<Browse />} />

            <Route
              path="/post"
              element={
                <RequireAuth>
                  <PostItem />
                </RequireAuth>
              }
            />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/report" element={<ReportItem />} />
            <Route path="/kyc" element={<KYCPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
