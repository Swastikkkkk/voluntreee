import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { doc, getDoc, collection, getDocs, query, orderBy } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const VolunteerDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch volunteer profile
  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/login");
        return;
      }
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
      setLoading(false);
    };
    fetchProfile();
  }, [navigate]);

  // Fetch announcements from Firestore
  useEffect(() => {
    const fetchAnnouncements = async () => {
      const q = query(collection(db, "announcements"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setAnnouncements(data);
    };
    fetchAnnouncements();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow p-8 mb-8">
        <h1 className="text-3xl font-bold text-green-900 mb-2">
          Welcome{profile?.name ? `, ${profile.name}` : ""}!
        </h1>
        <p className="text-green-700 mb-6">
          Here’s your volunteer dashboard. Track your progress, see announcements, and take quizzes!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-green-100 p-4 rounded-lg flex flex-col items-center">
            <span className="text-lg font-semibold text-green-800">Hours Last Week</span>
            <span className="text-2xl font-bold">{profile?.hoursLastWeek ?? "Not set"}</span>
          </div>
          <div className="bg-green-100 p-4 rounded-lg flex flex-col items-center">
            <span className="text-lg font-semibold text-green-800">Current Project</span>
            <span className="text-2xl font-bold">{profile?.currentProject ?? "Not set"}</span>
          </div>
          <div className="bg-green-100 p-4 rounded-lg flex flex-col items-center">
            <span className="text-lg font-semibold text-green-800">Skills</span>
            <span className="text-2xl font-bold">{profile?.skills ?? "Not set"}</span>
          </div>
          <div className="bg-green-100 p-4 rounded-lg flex flex-col items-center">
            <span className="text-lg font-semibold text-green-800">City</span>
            <span className="text-2xl font-bold">{profile?.city ?? "Not set"}</span>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="px-8 py-3 bg-green-700 text-white rounded-xl font-semibold text-lg shadow hover:bg-green-800 transition"
            onClick={() => navigate("/quiz")}
          >
            Take a Quiz
          </button>
        </div>
      </div>
      <div className="w-full max-w-3xl bg-green-50 rounded-xl shadow p-6">
        <h2 className="text-xl font-bold text-green-800 mb-3">Recent Announcements</h2>
        {announcements.length > 0 ? (
          <ul className="list-disc pl-6 text-green-900">
            {announcements.map((item, idx) => (
              <li key={idx} className="mb-2">
                <span className="font-medium">{item.message}</span>
                <div className="text-sm text-gray-500">
                  {item.timestamp
                    ? new Date(item.timestamp).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                    : ""}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-green-600">No announcements at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default VolunteerDashboard;
