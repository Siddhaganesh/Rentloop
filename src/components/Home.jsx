import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white dark:from-gray-900 dark:to-gray-800 px-4 py-8 md:px-12 text-gray-800 dark:text-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-700 dark:text-indigo-300">
          RentLoop
        </h1>

        <Link
          to="/login"
          className="border px-4 py-2 rounded hover:bg-indigo-100 dark:hover:bg-gray-700 transition font-medium dark:text-gray-200"
        >
          Login
        </Link>
      </header>

      {/* Hero Section */}
      <section className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-100">
          Rent. Use. Return. Repeat.
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
          Find and rent items from people nearby. Save money, space, and the planet.
        </p>
        <div className="mt-6 flex max-w-xl mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search items (books, cameras, tools...)"
            className="flex-1 px-4 py-2 border rounded-l-xl focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <button
            onClick={handleSearch}
            className="bg-indigo-600 text-white px-4 py-2 rounded-r-xl flex items-center hover:bg-indigo-700 transition"
          >
            🔍 Search
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-6">
        {[
          {
            icon: '📤',
            title: 'Post an Item',
            desc: 'Got something you’re not using? Upload photos, set your rent, and start earning.',
          },
          {
            icon: '📍',
            title: 'Find Nearby',
            desc: 'Browse items listed around you in societies, hostels, or classrooms.',
          },
          {
            icon: '🛍️',
            title: 'Rent Easily',
            desc: 'Request, pay, and pick up your item. Hassle-free and hyperlocal.',
          },
        ].map(({ icon, title, desc }) => (
          <div
            key={title}
            className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow hover:shadow-xl text-center transition-shadow"
          >
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HomePage;
