import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, getDocs, query, orderBy, doc, setDoc, getDoc } from "firebase/firestore";

const VolunteerOpportunities = ({ userId }) => {
  const [opportunities, setOpportunities] = useState([]);
  const [participation, setParticipation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmingId, setConfirmingId] = useState(null);

  // Fetch opportunities from Firestore
  useEffect(() => {
    const fetchOpportunities = async () => {
      const q = query(collection(db, "opportunities"), orderBy("date", "desc"));
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setOpportunities(data);
      setLoading(false);
    };
    fetchOpportunities();
  }, []);

  // Fetch participation from Firestore
  useEffect(() => {
    const fetchParticipation = async () => {
      if (!userId) return;
      const docRef = doc(db, "participation", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setParticipation(docSnap.data().confirmedOpportunities || []);
      } else {
        setParticipation([]);
      }
    };
    fetchParticipation();
  }, [userId]);

  // Handle participation confirmation
  const handleParticipation = (id) => {
    setConfirmingId(id);
  };

  const confirmParticipation = async (id) => {
    if (!userId) {
      alert("You must be logged in to confirm participation.");
      return;
    }
    const updated = [...participation, id];
    setParticipation(updated);
    try {
      await setDoc(doc(db, "participation", userId), {
        confirmedOpportunities: updated
      });
    } catch (error) {
      alert("Error saving participation: " + error.message);
    }
    setConfirmingId(null);
  };

  const cancelParticipation = () => {
    setConfirmingId(null);
  };

  if (loading) return <div className="p-10 text-center">Loading opportunities...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-10 px-2">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-green-800 mb-8 text-center drop-shadow">
          🌟 Volunteer Opportunities
        </h2>
        {opportunities.length === 0 && (
          <div className="text-gray-500 text-center py-10">
            No opportunities posted yet.
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {opportunities.map((op) => (
            <div
              key={op.id}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between border border-green-100 hover:shadow-2xl transition"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-600 font-bold text-lg">{op.title}</span>
                  {participation.includes(op.id) && (
                    <span className="ml-2 text-green-700 text-xs font-semibold bg-green-100 px-2 py-0.5 rounded-full">
                      Confirmed
                    </span>
                  )}
                </div>
                <div className="text-gray-700 mb-2">{op.description}</div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <span className="mr-3">
                    <span className="font-semibold">Date:</span> {op.date}
                  </span>
                  <span className="mr-3">
                    <span className="font-semibold">Time:</span> {op.time}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  <span className="font-semibold">Location:</span> {op.location}
                </div>
              </div>
              <div className="mt-4">
                {!participation.includes(op.id) ? (
                  <button
                    className="w-full bg-gradient-to-r from-green-500 to-green-7text-white font-semibold py-2 rounded-xl shadow hover:from-green-600 hover:to-green-800 transition"
                    onClick={() => handleParticipation(op.id)}
                  >
                    I want to participate!
                  </button>
                ) : (
                  <div className="w-full text-center text-green-700 font-semibold py-2 rounded-xl bg-green-50 border border-green-200">
                    You have confirmed your participation.
                  </div>
                )}
              </div>
              {/* Confirmation Dialog */}
              {confirmingId === op.id && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                  <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-xs text-center">
                    <div className="mb-4 text-lg font-semibold text-green-800">
                      Confirm Participation?
                    </div>
                    <div className="mb-6 text-gray-700">
                      Are you sure you want to participate in <span className="font-bold">{op.title}</span>?
                    </div>
                    <div className="flex gap-4 justify-center">
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                        onClick={() => confirmParticipation(op.id)}
                      >
                        Yes
                      </button>
                      <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                        onClick={cancelParticipation}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VolunteerOpportunities;
