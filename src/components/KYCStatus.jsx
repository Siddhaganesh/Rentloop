// src/components/KYCStatus.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const KYCStatus = () => {
  const [kycStatus, setKycStatus] = useState("Not Submitted");

  useEffect(() => {
    const storedStatus = localStorage.getItem("kycStatus");
    if (storedStatus) {
      setKycStatus(storedStatus);
    }
  }, []);

  const getStatusStyles = (status) => {
    switch (status) {
      case "Verified":
        return "text-green-600 dark:text-green-400";
      case "Pending":
        return "text-yellow-600 dark:text-yellow-400";
      case "Rejected":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-300";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md mt-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-300 mb-4">KYC Status</h2>

      <p className={`text-lg font-semibold ${getStatusStyles(kycStatus)}`}>
        {kycStatus}
      </p>

      {kycStatus === "Not Submitted" && (
        <p className="mt-4 text-sm">
          You have not submitted your KYC yet.{" "}
          <Link to="/kyc" className="text-indigo-600 underline hover:text-indigo-800 dark:hover:text-indigo-400">
            Submit Now
          </Link>
        </p>
      )}
    </div>
  );
};

export default KYCStatus;
