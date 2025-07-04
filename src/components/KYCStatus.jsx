import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom'; // 👈 added

const KYCStatus = () => {
  const [kycVerified, setKycVerified] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKYC = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const docRef = doc(db, "kycStatus", user.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().verified) {
          setKycVerified(true);
        } else {
          setKycVerified(false);
        }
      } catch (error) {
        console.error("Error fetching KYC status:", error);
        setKycVerified(false);
      } finally {
        setLoading(false);
      }
    };

    fetchKYC();
  }, []);

  if (loading) return <p className="text-sm text-gray-500">Checking KYC status...</p>;

  return (
    <div className="text-center mt-4 mb-10">
      {kycVerified ? (
        <p className="text-green-600 font-semibold text-lg">✅ KYC Verified</p>
      ) : (
        <p className="text-red-500 font-semibold text-lg">
          ❌ KYC Not Verified — Please{" "}
          <Link to="/kyc" className="underline text-indigo-600">complete your KYC</Link>
        </p>
      )}
    </div>
  );
};

export default KYCStatus;
