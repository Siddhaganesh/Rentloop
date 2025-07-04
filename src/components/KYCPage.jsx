// src/components/KYCPage.jsx
import React, { useEffect, useState } from "react";
import KYCForm from "./KYCForm";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const KYCPage = ({ onKYCComplete }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [kycVerified, setKycVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const email = user.email;
        setUserEmail(email);

        try {
          const docRef = doc(db, "kycStatus", email);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists() && docSnap.data().verified === true) {
            console.log("✅ Already verified KYC");
            setKycVerified(true);
            onKYCComplete?.(); // 🔥 Tells App.jsx to update
            setTimeout(() => navigate("/post"), 1500);
          } else {
            console.log("❌ KYC not verified yet");
            setKycVerified(false);
          }
        } catch (err) {
          console.error("Error fetching KYC:", err);
        }
      } else {
        navigate("/login");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate, onKYCComplete]);

  const handleKYCSubmit = async (formData) => {
    if (!userEmail) return;

    try {
      await setDoc(doc(db, "kycStatus", userEmail), {
        verified: true,
        fullName: formData.fullName,
        dob: formData.dob,
        mobile: formData.mobile,
        aadhaarNumber: formData.aadhaarNumber,
        timestamp: new Date(),
      });

      alert("✅ KYC submitted successfully!");
      setKycVerified(true);
      onKYCComplete?.(); // 🔥 Tells App.jsx again
      setTimeout(() => navigate("/post"), 1500);
    } catch (error) {
      console.error("❌ Error saving KYC:", error);
      alert("Failed to submit KYC. Please try again.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Checking KYC status...</p>;
  }

  if (kycVerified) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-green-600 mb-2">✅ KYC Already Verified</h2>
        <p className="text-gray-600">Redirecting to post page...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <KYCForm onSubmit={handleKYCSubmit} />
    </div>
  );
};

export default KYCPage;
