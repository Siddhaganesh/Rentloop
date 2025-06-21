// src/api/mockKYC.js

export const mockSubmitKYC = (formData) => {
  console.log("KYC Data Received:", formData);

  // Simulate parsing Aadhaar XML
  setTimeout(() => {
    console.log("✅ Simulated KYC verified for:", formData.fullName);
    // You can also store a mock KYC status in localStorage
    localStorage.setItem("kycStatus", "Verified");
  }, 2000);
};
