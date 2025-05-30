// DashboardPortal.jsx

import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line,
} from "recharts";

const mainGreen = "#205c37";
const accentGreen = "#2e7d4f";
const pieColors = [mainGreen, "#a2d5a1", "#b7e4c7"];

const mockPerformance = [
  { name: "Jan", value: 30 },
  { name: "Feb", value: 50 },
  { name: "Mar", value: 45 },
  { name: "Apr", value: 60 },
  { name: "May", value: 75 },
];

const mockPie = [
  { name: "Completed", value: 60 },
  { name: "Pending", value: 25 },
  { name: "Failed", value: 15 },
];

const mockBar = [
  { name: "T1", value: 10 },
  { name: "T2", value: 20 },
  { name: "T3", value: 15 },
  { name: "T4", value: 30 },
  { name: "T5", value: 25 },
];

const mockTrainers = [
  { name: "Priya Sharma", camp: "Delhi", status: "Assigned" },
  { name: "Amit Verma", camp: "Mumbai", status: "Assigned" },
  { name: "Neha Singh", camp: "Kolkata", status: "Available" },
];

export default function DashboardPortal() {
  const [user, setUser] = useState({ name: "Rahul", role: "Trainee" });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  // Navigation state
  const [activeTab, setActiveTab] = useState("Trainee");

  // Button actions
  const handleCardAction = (type) => {
    if (type === "dashboard") {
      setModalContent("Welcome to your training dashboard! Here you can view your progress, access materials, and see feedback.");
      setShowModal(true);
    }
    if (type === "travel") {
      setModalContent("Travel options for your next camp have been sent to your email via MakeMyTrip.");
      setShowModal(true);
    }
    if (type === "assign") {
      setModalContent(
        <div>
          <b>Trainer Assignment</b>
          <ul className="mt-2 space-y-1">
            {mockTrainers.map((t, i) => (
              <li key={i} className="flex justify-between">
                <span>{t.name} ({t.camp})</span>
                <span className={`font-semibold ${t.status === "Assigned" ? "text-green-700" : "text-yellow-700"}`}>{t.status}</span>
              </li>
            ))}
          </ul>
        </div>
      );
      setShowModal(true);
    }
  };

  // Navbar tabs
  const navTabs = ["Trainee", "Trainer", "Admin"];

  return (
    <div className="min-h-screen bg-[#e9f5e1] p-6 font-sans">
      {/* Top Navbar */}
      <nav className="bg-[#205c37] rounded-t-xl px-8 py-4 flex items-center justify-between shadow-md">
        <span className="text-white text-xl font-bold tracking-wide">
          EXPA CADET Program
        </span>
        <div className="space-x-8">
          {navTabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-white font-medium px-2 py-1 rounded transition ${
                activeTab === tab ? "bg-[#2e7d4f]" : "hover:bg-[#1a3c23]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          {/* Welcome Card */}
          <div className="bg-[#f1faee] rounded-xl shadow p-6 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-2xl font-bold text-[#205c37] mb-2">
                Welcome, {user.name}
              </h2>
              <p className="text-[#205c37] mb-6">
                Access your training materials, assessments, and feedback here.
              </p>
            </div>
            <button
              className="bg-[#205c37] text-white px-5 py-2 rounded-lg font-semibold mt-auto w-fit hover:bg-[#2e7d4f] transition"
              onClick={() => handleCardAction("dashboard")}
            >
              Go to Dashboard
            </button>
          </div>
          {/* Travel Management Card */}
          <div className="bg-[#f1faee] rounded-xl shadow p-6 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-2xl font-bold text-[#205c37] mb-2">
                Travel Management
              </h2>
              <p className="text-[#205c37] mb-6">
                Automate travel options for trainers with MakeMyTrip links.
              </p>
            </div>
            <button
              className="bg-[#205c37] text-white px-5 py-2 rounded-lg font-semibold mt-auto w-fit hover:bg-[#2e7d4f] transition"
              onClick={() => handleCardAction("travel")}
            >
              Manage Travel
            </button>
          </div>
        </div>
        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* Trainer Assignment Card */}
          <div className="bg-[#f1faee] rounded-xl shadow p-6 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-2xl font-bold text-[#205c37] mb-2">
                Trainer Assignment
              </h2>
              <p className="text-[#205c37] mb-6">
                Select and assign trainers to NCC camps nationwide.
              </p>
            </div>
            <button
              className="bg-[#205c37] text-white px-5 py-2 rounded-lg font-semibold mt-auto w-fit hover:bg-[#2e7d4f] transition"
              onClick={() => handleCardAction("assign")}
            >
              Assign Trainers
            </button>
          </div>
          {/* Trainer and NCC Camp Locations + Analytics */}
          <div className="bg-[#f1faee] rounded-xl shadow p-6 flex flex-col h-full">
            <h2 className="text-2xl font-bold text-[#205c37] mb-4">
              Trainer and NCC Camp Locations
            </h2>
            <div className="flex gap-4 flex-col md:flex-row">
              {/* Map Placeholder */}
              <div className="flex-1 bg-[#e9f5e1] rounded-lg flex flex-col items-center justify-center p-4 min-w-[90px]">
                {/* Simple India map outline (SVG placeholder) */}
                <svg width="80" height="100" viewBox="0 0 80 100" fill="none">
                  <rect x="10" y="10" width="60" height="80" rx="30" fill="#b7e4c7" />
                  <circle cx="40" cy="50" r="25" fill="#205c37" fillOpacity="0.2" />
                  <text x="40" y="90" textAnchor="middle" fill="#205c37" fontSize="10">
                    Trainer and NCC Camp Locations
                  </text>
                </svg>
              </div>
              {/* Analytics */}
              <div className="flex flex-col flex-1 gap-2">
                <div className="bg-[#e9f5e1] rounded-lg flex items-center justify-center h-1/2 p-2">
                  <div className="w-full">
                    <p className="text-[#205c37] text-sm font-semibold mb-1">
                      Performance Analytics
                    </p>
                    <ResponsiveContainer width="100%" height={40}>
                      <BarChart data={mockBar}>
                        <Bar dataKey="value" fill={mainGreen} radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="flex gap-2 h-1/2">
                  <div className="bg-[#e9f5e1] rounded-lg flex items-center justify-center flex-1 p-2">
                    <ResponsiveContainer width="100%" height={40}>
                      <PieChart>
                        <Pie
                          data={mockPie}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={15}
                        >
                          {mockPie.map((entry, i) => (
                            <Cell key={i} fill={pieColors[i % pieColors.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="bg-[#e9f5e1] rounded-lg flex items-center justify-center flex-1 p-2">
                    <ResponsiveContainer width="100%" height={40}>
                      <LineChart data={mockPerformance}>
                        <Line type="monotone" dataKey="value" stroke={mainGreen} strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> {/* End grid */}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 min-w-[320px] max-w-[90vw]">
            <button
              className="absolute top-2 right-4 text-gray-500 hover:text-green-700 text-2xl font-bold"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="mt-2 text-[#205c37]">{modalContent}</div>
          </div>
        </div>
      )}
    </div>
  );
}
