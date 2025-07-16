// src/App.js
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './components/Home';
import SidebarWithDarkMode from './components/SidebarWithDarkMode';
import Login from './components/Login';
import Browse from './components/Browse';
import PostItem from './components/PostItem';
import Dashboard from './components/Dashboard';
import ReportItem from './components/ReportItem';
import KYCPage from './components/KYCPage';
import AboutUs from './components/AboutUs';
import Signup from "./components/Signup";

import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import './index.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [kycVerified, setKycVerified] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Theme setup
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

  // Firebase auth + KYC status listener (auto-login bug fixed)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const manuallyLoggedIn = localStorage.getItem("manualLogin") === "true";

      if (user && manuallyLoggedIn) {
        setUserEmail(user.email);
        setIsAuthenticated(true);

        try {
          const docRef = doc(db, 'kycStatus', user.email);
          const docSnap = await getDoc(docRef);
          setKycVerified(docSnap.exists() && docSnap.data().verified === true);
        } catch (error) {
          console.error('Error fetching KYC:', error);
          setKycVerified(false);
        }
      } else {
        setUserEmail(null);
        setIsAuthenticated(false);
        setKycVerified(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("manualLogin");
    setTimeout(() => {
      setIsAuthenticated(false);
      setKycVerified(false);
      setUserEmail(null);
    }, 10);
  };

  const RequireAuth = ({ children }) =>
    isAuthenticated ? children : <Navigate to="/login" replace />;

  const RequireKYC = ({ children }) =>
    isAuthenticated && kycVerified ? children : <Navigate to="/kyc" replace />;

  return (
    <div className="flex">
      <SidebarWithDarkMode
        darkMode={darkMode}
        toggleTheme={toggleTheme}
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setSidebarOpen((prev) => !prev)}
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
            path="/signup"
            element={<Signup handleLogin={handleLogin} />}
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
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/report" element={<ReportItem />} />

          <Route
            path="/kyc"
            element={<KYCPage onKYCComplete={() => setKycVerified(true)} />}
          />

          <Route
            path="/post"
            element={
              <RequireAuth>
                <RequireKYC>
                  <PostItem />
                </RequireKYC>
              </RequireAuth>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
