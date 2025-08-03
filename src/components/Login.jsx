// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ handleLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError('Please fill in both fields.');
      return;
    }

    try {
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);
      const user = userCredential.user;

      // Save login info
      localStorage.setItem('manualLogin', 'true');
      localStorage.setItem('userEmail', user.email);

      handleLogin(); // notify App.jsx
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
      switch (err.code) {
        case 'auth/user-not-found':
          setError('No account found for this email.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email format.');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Try again later.');
          break;
        default:
          setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
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
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-indigo-700 dark:text-indigo-300">RentLoop</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Log in to continue renting</p>
        </div>

        {error && (
          <motion.div
            className="text-red-500 mb-4 text-sm text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-xl font-semibold transition duration-300 ${
            loading
              ? 'bg-indigo-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Create one
          </Link>
        </p>
      </motion.form>
    </motion.div>
  );
};

export default Login;
