// pages/PostItem.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PostItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    image: '',
    deposit: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuth) navigate('/login');
  }, [navigate]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price || isNaN(formData.price)) newErrors.price = 'Valid price required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    if (!formData.deposit || isNaN(formData.deposit)) newErrors.deposit = 'Valid deposit required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    const newItem = {
      id: Date.now(),
      ...formData,
      price: parseFloat(formData.price),
      deposit: parseFloat(formData.deposit)
    };

    const existing = JSON.parse(localStorage.getItem('rentloop_items')) || [];
    localStorage.setItem('rentloop_items', JSON.stringify([...existing, newItem]));

    setSuccess('Item posted successfully!');
    setFormData({
      title: '',
      description: '',
      price: '',
      location: '',
      image: '',
      deposit: ''
    });

    setTimeout(() => {
      setSubmitting(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-300 mb-6 text-center">
        Post a New Item
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {['title', 'description', 'price', 'location', 'image', 'deposit'].map((field) => (
          <div key={field}>
            {field !== 'description' ? (
              <input
                type={field === 'price' || field === 'deposit' ? 'number' : 'text'}
                name={field}
                placeholder={field === 'deposit' ? 'Caution Deposit (₹)' : field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            ) : (
              <textarea
                name="description"
                placeholder="Description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            )}
            {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
          </div>
        ))}

        {/* Image preview */}
        {formData.image && (
          <div className="mt-4 text-center">
            <img
              src={formData.image}
              alt="Preview"
              className="w-full max-h-64 object-contain rounded-lg border border-gray-200 dark:border-gray-700"
            />
            <p className="text-sm text-gray-500 mt-2">Image preview</p>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className={`w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold transition ${
            submitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
          }`}
        >
          {submitting ? 'Posting...' : 'Post Item'}
        </button>
      </form>

      {success && (
        <p className="text-green-600 dark:text-green-400 text-center mt-4">{success}</p>
      )}
    </div>
  );
};

export default PostItem;
