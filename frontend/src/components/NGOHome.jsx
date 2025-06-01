import React, { useState, useEffect } from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, ResponsiveContainer,
} from "recharts";
import OpportunitiesSection from "./OpportunitiesSection";
import ParticipantsChart from "./ParticipantsChart";
import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query
} from "firebase/firestore";

const stats = {
  volunteers: 120,
  events: 18,
  donations: 45000,
  livesImpacted: 3200,
  hoursSpent: 980,
  domains: [
    { name: "Women Empowerment", value: 320 },
    { name: "Cleanliness", value: 210 },
    { name: "Education", value: 270 },
    { name: "Health", value: 180 }
  ],
  bestEmployee: {
    name: "Priya Sharma",
    role: "Volunteer Coordinator",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    achievement: "Led 5 successful events this month"
  }
};

const attendanceData = [
  { event: "Health Camp", turnedUp: 45, notTurnedUp: 5 },
  { event: "Clean City Drive", turnedUp: 38, notTurnedUp: 7 },
  { event: "Literacy Workshop", turnedUp: 50, notTurnedUp: 2 },
  { event: "Empower Women", turnedUp: 42, notTurnedUp: 8 },
  { event: "Blood Donation", turnedUp: 35, notTurnedUp: 10 },
];

const pieColors = ["#27ae60", "#229954", "#52be80", "#b7e4c7"];

const NGOHome = () => {
  const [announcement, setAnnouncement] = useState("");
  const [all, setAll] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editMessage, setEditMessage] = useState("");
  const [editDocId, setEditDocId] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const q = query(collection(db, "announcements"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setAll(data);
    };
    fetchAnnouncements();
  }, []);

  const formatDate = (iso) => {
    if (!iso) return "";
    const date = new Date(iso);
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

  const handlePost = async () => {
    if (!announcement.trim()) return;
    const newEntry = {
      message: announcement,
      timestamp: new Date().toISOString()
    };
    const docRef = await addDoc(collection(db, "announcements"), newEntry);
    setAll([{ ...newEntry, id: docRef.id }, ...all]);
    setAnnouncement("");
  };

  const handleDelete = async (idx) => {
    const docId = all[idx].id;
    await deleteDoc(doc(db, "announcements", docId));
    setAll(all.filter((_, i) => i !== idx));
  };

  const handleEdit = (idx) => {
    setEditIndex(idx);
    setEditMessage(all[idx].message);
    setEditDocId(all[idx].id);
  };

  const handleUpdate = async () => {
    await updateDoc(doc(db, "announcements", editDocId), {
      message: editMessage
    });
    const updated = all.map((item, i) =>
      i === editIndex ? { ...item, message: editMessage } : item
    );
    setAll(updated);
    setEditIndex(null);
    setEditMessage("");
    setEditDocId(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-100 p-6">
      <div className="max-w-7xl w-full mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-green-900">Welcome, NGO Partner!</h2>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Announcements */}
          <div className="flex-1 max-w-2xl w-full flex flex-col gap-6">
            {/* Post Announcement Card */}
            <div className="bg-white rounded-xl shadow-lg border border-green-100 p-6">
              <h3 className="text-xl font-bold text-green-800 mb-4">Post Announcement</h3>
              <textarea
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                placeholder="Enter announcement here..."
                className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                rows={4}
              />
              <button
                onClick={handlePost}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition shadow-md"
              >
                Post Announcement
              </button>
            </div>
            {/* All Announcements Card */}
            <div className="bg-white rounded-xl shadow-lg border border-green-100 p-6 flex-1">
              <h3 className="text-xl font-bold text-green-800 mb-4">All Announcements</h3>
              <ul className="space-y-4">
                {all.length ? (
                  all.map((item, index) => (
                    <li key={item.id} className="border-b border-green-100 pb-4 last:border-b-0">
                      {editIndex === index ? (
                        <div className="mb-4">
                          <textarea
                            value={editMessage}
                            onChange={(e) => setEditMessage(e.target.value)}
                            className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                            rows={3}
                          />
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={handleUpdate}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => setEditIndex(null)}
                              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-green-900">{item.message}</p>
                            <p className="text-sm text-gray-500 mt-1">
                              {formatDate(item.timestamp)}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(index)}
                              className="text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(index)}
                              className="text-red-600 hover:text-red-800 hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </li>
                  ))
                ) : (
                  <li className="text-green-700 italic">No announcements posted yet.</li>
                )}
              </ul>
              <OpportunitiesSection />
              <ParticipantsChart />
            </div>
          </div>
          {/* Right: Stats, Best Employee, Charts */}
          <div className="flex-[2] flex flex-col gap-6">
            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg border border-green-100 p-6 flex flex-col items-center">
                <span className="text-green-700 font-semibold text-lg">Volunteers</span>
                <span className="text-3xl font-bold mt-2">{stats.volunteers}</span>
              </div>
              <div className="bg-white rounded-xl shadow-lg border border-green-100 p-6 flex flex-col items-center">
                <span className="text-green-700 font-semibold text-lg">Events</span>
                <span className="text-3xl font-bold mt-2">{stats.events}</span>
              </div>
              <div className="bg-white rounded-xl shadow-lg border border-green-100 p-6 flex flex-col items-center">
                <span className="text-green-700 font-semibold text-lg">Donations (₹)</span>
                <span className="text-3xl font-bold mt-2">{stats.donations.toLocaleString()}</span>
              </div>
            </div>
            {/* New Stats: Lives Impacted, Hours Spent, Domains */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg border border-green-100 p-6 flex flex-col items-center">
                <span className="text-green-700 font-semibold text-lg">Lives Impacted</span>
                <span className="text-3xl font-bold mt-2">{stats.livesImpacted}</span>
              </div>
              <div className="bg-white rounded-xl shadow-lg border border-green-100 p-6 flex flex-col items-center">
                <span className="text-green-700 font-semibold text-lg">Volunteer Hours</span>
                <span className="text-3xl font-bold mt-2">{stats.hoursSpent}</span>
              </div>
              <div className="bg-white rounded-xl shadow-lg border border-green-100 p-6 flex flex-col items-center">
                <span className="text-green-700 font-semibold text-lg">Domains Served</span>
                <ul className="mt-2 text-green-900 text-sm space-y-1">
                  {stats.domains.map((d) => (
                    <li key={d.name}>{d.name}: <b>{d.value}h</b></li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Best Employee */}
            <div className="bg-green-100 rounded-xl shadow-lg border border-green-200 p-6 flex flex-col items-center max-w-xs">
              <img src={stats.bestEmployee.image} alt="Best Employee" className="w-16 h-16 rounded-full mb-2"/>
              <span className="font-bold text-green-900">{stats.bestEmployee.name}</span>
              <span className="text-green-700 text-sm">{stats.bestEmployee.role}</span>
              <span className="text-xs text-green-800 mt-2 text-center">{stats.bestEmployee.achievement}</span>
            </div>
            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pie Chart */}
              <div className="bg-white rounded-xl shadow-lg border border-green-100 p-6 flex flex-col items-center">
                <span className="font-semibold text-green-800 mb-2">Hours by Domain</span>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={stats.domains}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {stats.domains.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={pieColors[idx % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Bar Chart */}
              <div className="bg-white rounded-xl shadow-lg border border-green-100 p-6 flex flex-col items-center">
                <span className="font-semibold text-green-800 mb-2">Event Attendance</span>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={attendanceData}>
                    <XAxis dataKey="event" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="turnedUp" fill="#27ae60" name="Turned Up" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="notTurnedUp" fill="#e67e22" name="Did Not Turn Up" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGOHome;
