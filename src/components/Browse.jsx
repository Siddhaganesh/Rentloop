import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const mockItems = [
  { id: 1, title: 'Wooden Study Table', icon: '🪑', price: 750, location: 'Hyderabad', description: 'Perfect for students and professionals.', deposit: 500 },
  { id: 2, title: 'Compact Fridge', icon: '🧊', price: 1200, location: 'Chennai', description: 'Mini fridge for hostels.', deposit: 1000 },
  { id: 3, title: 'Office Chair', icon: '💺', price: 300, location: 'Bangalore', description: 'Ergonomic, smooth wheels.', deposit: 200 },
  { id: 4, title: 'Mountain Bicycle', icon: '🚲', price: 450, location: 'Pune', description: 'Adventure-ready MTB.', deposit: 1000 },
  { id: 5, title: 'Electric Drill', icon: '🔧', price: 200, location: 'Delhi', description: 'Includes multiple bits.', deposit: 300 },
  { id: 6, title: 'DSLR Camera', icon: '📷', price: 900, location: 'Mumbai', description: 'Canon with 18-55mm lens.', deposit: 1500 },
  { id: 7, title: 'Tent (2-Person)', icon: '⛺', price: 350, location: 'Manali', description: 'Waterproof & light.', deposit: 400 },
  { id: 8, title: 'Cooking Set', icon: '🍳', price: 150, location: 'Kolkata', description: 'Includes pots & stove.', deposit: 200 },
  { id: 9, title: 'Microwave Oven', icon: '🔥', price: 500, location: 'Hyderabad', description: '20L solo microwave.', deposit: 600 },
  { id: 10, title: 'Books Bundle', icon: '📚', price: 100, location: 'Chennai', description: '10+ novels combo.', deposit: 100 },
  { id: 11, title: 'Sound System', icon: '🔊', price: 650, location: 'Bangalore', description: 'Loud & bass-heavy.', deposit: 700 },
  { id: 12, title: 'Ladder (10ft)', icon: '🪜', price: 250, location: 'Pune', description: 'Aluminum, foldable.', deposit: 300 }
];

const Browse = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search).get('search')?.toLowerCase() || '';
  const filteredItems = mockItems.filter(item =>
    item.title.toLowerCase().includes(query)
  );

  const handleRent = () => {
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuth) {
      navigate('/login');
    } else {
      alert('Proceed to rent (feature coming soon).');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
      <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-300 mb-4 text-center">
        Browse Items
      </h2>

      {filteredItems.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mt-6">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col">
              <div className="text-5xl mb-2">{item.icon}</div>
              <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300 mb-1">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
                {item.description}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                📍 {item.location}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mb-1">
                ₹{item.price} / day
              </p>
              <p className="text-sm text-yellow-600 dark:text-yellow-400 mb-4">
                Caution Deposit: ₹{item.deposit}
              </p>

              <button
                onClick={handleRent}
                className="mt-auto px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition text-sm"
              >
                🚀 Rent Now
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-300 mt-12">
          No items found.
        </p>
      )}
    </div>
  );
};

export default Browse;
