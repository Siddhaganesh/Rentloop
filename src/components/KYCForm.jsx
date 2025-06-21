// src/components/KYCForm.jsx

import React, { useState } from "react";

const KYCForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    mobile: "",
    aadhaarNumber: "",
    xmlFile: null,
    shareCode: "",
    selfie: null,
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.xmlFile || !formData.shareCode) {
      setStatus("Please upload Aadhaar XML and enter share code.");
      return;
    }

    // Call mock submit handler (passed via props or mocked inside app)
    onSubmit?.(formData);
    setStatus("KYC submitted successfully! Awaiting verification...");
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-300">KYC Verification</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="fullName"
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Date of Birth</label>
          <input
            type="date"
            name="dob"
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Aadhaar Number (Masked)</label>
          <input
            type="text"
            name="aadhaarNumber"
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800"
            value={formData.aadhaarNumber}
            onChange={handleChange}
            maxLength={12}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Upload Aadhaar XML</label>
          <input
            type="file"
            name="xmlFile"
            accept=".xml"
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">XML Share Code</label>
          <input
            type="password"
            name="shareCode"
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800"
            value={formData.shareCode}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Upload Selfie (optional)</label>
          <input
            type="file"
            name="selfie"
            accept="image/*"
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 transition"
        >
          Submit KYC
        </button>

        {status && <p className="text-green-600 dark:text-green-400 mt-2">{status}</p>}
      </form>
    </div>
  );
};

export default KYCForm;
