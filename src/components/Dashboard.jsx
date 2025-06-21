import React from 'react';
import { useNavigate } from 'react-router-dom';
import KYCStatus from "../components/KYCStatus";

const Dashboard = ({ handleLogout }) => {
  const navigate = useNavigate();
  const userName = "User";

  const logout = () => {
    handleLogout();      // update localStorage + isAuthenticated state
    navigate('/');       // send user to home
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4 py-8 md:px-12 text-gray-800 dark:text-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-700 dark:text-indigo-300">
          RentLoop
        </h1>

        <button
          onClick={logout}
          className="border px-4 py-2 rounded hover:bg-red-100 dark:hover:bg-gray-700 transition font-medium text-red-600 dark:text-red-400"
        >
          Logout
        </button>
      </header>

      {/* Welcome Section */}
      <section className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-100">
          Welcome back, {userName} 👋
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
          Let’s make lending and renting easier than ever.
        </p>
      </section>

      {/* KYC Status Block */}
      <KYCStatus />

      {/* Quick Access Section */}
      <section className="grid md:grid-cols-3 gap-6 mb-16 mt-10">
        {[{
          icon: "📦",
          title: "My Listings",
          desc: "View and manage items you've posted.",
          link: "/my-listings",
        }, {
          icon: "📬",
          title: "Requests",
          desc: "Track rental requests and approvals.",
          link: "/requests",
        }, {
          icon: "➕",
          title: "Post New Item",
          desc: "Add something new for others to rent.",
          link: "/post",
        }].map(({ icon, title, desc, link }) => (
          <a
            key={title}
            href={link}
            className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow hover:shadow-xl text-center transition-shadow transform hover:scale-[1.02]"
          >
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
          </a>
        ))}
      </section>

      <section className="text-center mt-12">
        <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
          Your impact matters 🌍
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Every item shared saves money and reduces waste. Thanks for being part of RentLoop!
        </p>
      </section>
    </div>
  );
};

export default Dashboard;
