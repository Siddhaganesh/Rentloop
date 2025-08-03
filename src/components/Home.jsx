import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Plus, Home, MapPin, Handshake } from 'lucide-react';

const features = [
  {
    icon: Plus,
    title: 'List Your Item',
    desc: 'Easily post photos and details of your items to start earning extra cash from what you already own.',
  },
  {
    icon: Search,
    title: 'Discover Nearby',
    desc: 'Browse a vast selection of items available for rent in your local area, from books to camera gear.',
  },
  {
    icon: Handshake,
    title: 'Seamless Transactions',
    desc: 'Connect with renters or listers, arrange a pickup, and handle payments securely all within the app.',
  },
];

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
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between p-6 md:p-8 border-b border-gray-100 dark:border-gray-800">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
          RentLoop
        </h1>
        <div className="flex items-center gap-4">
          <Link
            to="/post"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
          >
            <Plus className="w-5 h-5" />
            Post an Item
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition font-medium"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950 text-center">
        <h2 className="text-4xl md:text-6xl font-bold max-w-4xl mx-auto leading-tight text-gray-800 dark:text-white">
          The Smart Way to Use What You Need
        </h2>
        <p className="mt-4 md:mt-6 text-base md:text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
          Find and rent everything from tools and electronics to books and sports gear from people nearby.
        </p>
        <div className="mt-8 flex items-center justify-center max-w-2xl mx-auto p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for cameras, bicycles, books, and more..."
            className="flex-1 px-4 py-2 rounded-full bg-transparent outline-none focus:ring-0 dark:placeholder-gray-400"
          />
          <button
            onClick={handleSearch}
            className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-700 transition"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Why RentLoop? Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Why RentLoop?</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Experience the benefits of a sharing community.
          </p>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-indigo-100 dark:bg-indigo-900 rounded-full mb-4 text-indigo-600 dark:text-indigo-300">
                  <Icon className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-indigo-600 dark:bg-indigo-800 text-white text-center py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold">Ready to Start?</h3>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Turn your unused items into a source of income or find what you need without the commitment of buying.
          </p>
          <div className="mt-8">
            <Link
              to="/post"
              className="px-8 py-4 rounded-full bg-white text-indigo-600 font-bold text-lg hover:bg-gray-100 transition shadow-lg"
            >
              Start Earning Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;