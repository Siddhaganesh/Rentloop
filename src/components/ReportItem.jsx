// pages/ReportItem.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';




const ReportItem = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [form, setForm] = useState({
    itemId: '',
    reason: '',
    details: '',
    evidence: ''
  });

  const [success, setSuccess] = useState('');
  useEffect(() => {
    if (location.state?.itemId) {
      setForm(prev => ({ ...prev, itemId: location.state.itemId }));
    }
  }, [location]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.itemId || !form.reason || !form.details) {
      alert('Please complete all required fields');
      return;
    }

    const reports = JSON.parse(localStorage.getItem('rentloop_reports')) || [];
    const newReport = { id: Date.now(), ...form };
    localStorage.setItem('rentloop_reports', JSON.stringify([...reports, newReport]));

    setSuccess('Report submitted successfully.');
    setForm({ itemId: '', reason: '', details: '', evidence: '' });

    setTimeout(() => navigate('/dashboard'), 1500);
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4 text-center">
        Report an Issue
      </h2>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center">
        Use this form to report stolen or damaged items. Reports are reviewed and may be escalated to authorities.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="itemId"
          placeholder="Item ID (from Dashboard)"
          value={form.itemId}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        />

        <select
          name="reason"
          value={form.reason}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        >
          <option value="">Select reason</option>
          <option value="not_returned">Item not returned</option>
          <option value="damaged">Item returned damaged</option>
          <option value="fake_listing">Fake listing</option>
          <option value="other">Other</option>
        </select>

        <textarea
          name="details"
          placeholder="Detailed description"
          rows="4"
          value={form.details}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        />

        <input
          type="text"
          name="evidence"
          placeholder="Evidence (Image/Screenshot URL - optional)"
          value={form.evidence}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        />

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
        >
          Submit Report
        </button>
      </form>

      {success && (
        <p className="text-green-600 dark:text-green-400 text-center mt-4">{success}</p>
      )}
    </div>
  );
};

export default ReportItem;
