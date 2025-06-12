import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth"; // <-- Add signOut
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import {
  FaTachometerAlt,
  FaBullhorn,
  FaUser,
  FaComments,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaLightbulb,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";
import WhatsAppChatButton from "./WhatsAppChatButton";


const menuItems = [
  {
    label: "Dashboard",
    icon: <FaTachometerAlt />,
    path: "/volunteer-dashboard",
  },
  {
    label: "Opportunities",
    icon: <FaLightbulb />,
    path: "/opportunities",
  },
  {
    label: "Profile",
    icon: <FaUser />,
    dynamic: true,
    path: (userId) => `/volunteer/profile/${userId}`,
  },
  {
    label: "Communication Skill Test",
    icon: <FaComments />,
    path: "/communication-test",
  },
];

const VolunteerHome = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Firebase Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch announcements from Firestore in real-time
  useEffect(() => {
    const q = query(
      collection(db, "announcements"),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ann = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Announcements fetched:", ann);
      setAnnouncements(ann);
    });
    return () => unsubscribe();
  }, []);

  // Format timestamp for display safely
  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    let date;
    // Firestore timestamp has toDate method
    if (timestamp.toDate) {
      date = timestamp.toDate();
    } else if (timestamp.seconds) {
      // In case timestamp is a plain object with seconds
      date = new Date(timestamp.seconds * 1000);
    } else {
      date = new Date(timestamp);
    }
    if (isNaN(date.getTime())) return "Invalid date";
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out: " + error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-green-50">
        <div className="text-green-700 text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 shadow-lg flex flex-col
          ${isOpen ? "w-64" : "w-20"}
          bg-gradient-to-b from-green-700 via-green-800 to-green-900
          text-white rounded-r-3xl
        `}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-end p-2 focus:outline-none"
        >
          <span className="text-2xl">
            {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </span>
        </button>
        <div className="flex flex-col gap-2 mt-4">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-4 cursor-pointer px-4 py-3 mx-2 rounded-lg
                hover:bg-green-600 transition
                ${isOpen ? "" : "justify-center"}
              `}
              onClick={() =>
                item.dynamic
                  ? navigate(item.path(userId))
                  : navigate(item.path)
              }
            >
              <span className="text-xl">{item.icon}</span>
              {isOpen && (
                <span className="font-medium text-base">{item.label}</span>
              )}
            </div>
          ))}
        </div>
        <div className="flex-1" />
        <div className="mb-6 mx-2">
          <button
            className="flex items-center gap-3 w-full px-4 py-2 rounded-lg bg-green-800 hover:bg-green-700 transition text-white"
            onClick={handleLogout} // <-- Connect handleLogout here
          >
            <FaSignOutAlt className="text-lg" />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 relative overflow-auto bg-gradient-to-br from-green-50 via-white to-green-100">
        {/* Decorative SVG background shape */}
        <svg
          className="absolute top-0 right-0 opacity-10 pointer-events-none"
          width="400"
          height="400"
          viewBox="0 0 400 400"
          fill="none"
          style={{ zIndex: 0 }}
        >
          <circle cx="300" cy="100" r="120" fill="#34d399" />
        </svg>

        <div className="relative z-10 max-w-3xl mx-auto p-8">
          {/* Greeting Card */}
          <div className="flex items-center gap-4 mb-8">
            <FaUserCircle className="text-green-700 text-5xl bg-white rounded-full shadow p-2" />
            <div>
              <h1 className="text-3xl font-bold text-green-900 mb-1">
                Welcome, Volunteer!
              </h1>
              <div className="text-green-700 text-lg">
                Glad to see you making a difference today.
              </div>
            </div>
          </div>

          {/* Announcements Card */}
          <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg mb-8 border border-green-100">
            <div className="flex items-center gap-2 mb-4">
              <FaBell className="text-green-600 text-xl" />
              <h2 className="text-xl font-bold text-green-800">
                Announcements
              </h2>
            </div>
            {announcements.length > 0 ? (
              <ul className="space-y-4">
                {announcements.map((item) => (
                  <li
                    key={item.id}
                    className="bg-green-50 rounded-lg p-3 shadow flex flex-col"
                  >
                    <span className="font-medium text-green-900">
                      {item.message}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      {formatDate(item.timestamp)}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-green-600">No announcements at the moment.</p>
            )}
          </div>

          {/* Take a Quiz Button */}
          <div className="flex justify-center gap-4"> {/* Added gap-4 for spacing */}
            <button
              className="px-10 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl font-bold text-xl shadow-lg hover:from-green-700 hover:to-green-800 transition duration-200"
              onClick={() => navigate("/quiz")}
            >
              Take a Quiz
            </button>
            <WhatsAppChatButton />
         
          </div>
        </div>
           
      </div>
    </div>
  );
};

export default VolunteerHome;
