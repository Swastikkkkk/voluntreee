import React, { useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import VolunteerOpportunities from "./VolunteerOpportunities";

const VolunteerOpportunitiesWrapper = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!userId) return <div>Please log in to see opportunities.</div>;

  return <VolunteerOpportunities userId={userId} />;
};

export default VolunteerOpportunitiesWrapper;
