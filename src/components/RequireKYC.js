// src/components/RequireKYC.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const RequireKYC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, 'kycStatus', user.email);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists() && docSnap.data().verified) {
            setIsVerified(true);
          } else {
            setIsVerified(false);
          }
        } catch (error) {
          console.error('Error checking KYC:', error);
          setIsVerified(false);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Checking KYC status...</p>;

  return isVerified ? children : <Navigate to="/kyc" replace />;
};

export default RequireKYC;
