import React from 'react';
import { useNavigate } from 'react-router-dom';

const ItemCard = ({ item }) => {
  const navigate = useNavigate();

  const handleRent = () => {
  const isAuth = localStorage.getItem('isAuthenticated') === 'true';
  if (!isAuth) {
    navigate('/login');
    return;
  }

  // Proceed with rent action (open form, modal, etc.)
};


  const handleReport = () => {
    navigate('/report', { state: { itemId: item.id } });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-5 flex flex-col hover:shadow-lg transition">
      {/* Icon or Image */}
      {item.icon ? (
        <div className="text-6xl text-center mb-4">{item.icon}</div>
      ) : (
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}

      <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-300">{item.title}</h3>

      {item.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
      )}

      <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">📍 {item.location}</p>
      <p className="text-md font-semibold text-green-600 dark:text-green-400">
        ₹{item.price} / day
      </p>

      {item.deposit && (
        <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
          Caution Deposit: ₹{item.deposit}
        </p>
      )}

      <div className="mt-4 flex justify-between items-center">
        <button
          className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 text-sm"
          onClick={handleRent}
        >
          Rent Now
        </button>
        <button
          onClick={handleReport}
          className="text-sm text-red-500 hover:underline"
        >
          🚩 Report
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
