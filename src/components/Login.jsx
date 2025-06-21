// components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Login({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // 🔐 Validation
    if (!email || !password) {
      setError('All fields are required.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    // ✅ Store auth and redirect
    localStorage.setItem('isAuthenticated', 'true');
    handleLogin(); // 🔥 this notifies App.js
    navigate('/dashboard');
  };

  return (
    <motion.div
      className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-100 to-white dark:from-gray-900 dark:to-gray-800 px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.form
        onSubmit={handleLoginSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 border border-indigo-200 dark:border-gray-800"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* RentLoop Logo */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-indigo-700 dark:text-indigo-300">RentLoop</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Log in to continue renting</p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            className="text-red-500 mb-4 text-sm text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        {/* Email Field */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition duration-300 font-semibold"
        >
          Login
        </button>

        {/* Footer Note */}
        <p className="text-xs text-center text-gray-400 mt-4">
          Don't have an account? Registration coming soon.
        </p>
      </motion.form>
    </motion.div>
  );
}

export default Login;
