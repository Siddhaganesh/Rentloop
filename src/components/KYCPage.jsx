// src/pages/KYCPage.jsx

import React from "react";
import KYCForm from "../components/KYCForm";
import { mockSubmitKYC } from "../mockKYC";

const KYCPage = () => {
  const handleKYCSubmit = (formData) => {
    // Simulate backend processing
    mockSubmitKYC(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-10 px-4">
      <KYCForm onSubmit={handleKYCSubmit} />
    </div>
  );
};

export default KYCPage;
