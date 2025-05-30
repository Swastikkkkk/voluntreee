// DashboardMock.jsx

import React from "react";

export default function DashboardMock() {
  return (
    <div className="min-h-screen bg-[#e9f5e1] p-6 font-sans">
      {/* Top Navbar */}
      <nav className="bg-[#205c37] rounded-t-xl px-8 py-4 flex items-center justify-between">
        <span className="text-white text-xl font-bold tracking-wide">
          EXPA CADET Program
        </span>
        <div className="space-x-8">
          <a href="#" className="text-white font-medium hover:underline">
            Trainee
          </a>
          <a href="#" className="text-white font-medium hover:underline">
            Trainer
          </a>
          <a href="#" className="text-white font-medium hover:underline">
            Admin
          </a>
        </div>
      </nav>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          {/* Welcome Card */}
          <div className="bg-[#f1faee] rounded-xl shadow p-6 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-2xl font-bold text-[#205c37] mb-2">
                Welcome, Rahul
              </h2>
              <p className="text-[#205c37] mb-6">
                Access your training materials, assessments, and feedback here.
              </p>
            </div>
            <button className="bg-[#205c37] text-white px-5 py-2 rounded-lg font-semibold mt-auto w-fit">
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
            <button className="bg-[#205c37] text-white px-5 py-2 rounded-lg font-semibold mt-auto w-fit">
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
            <button className="bg-[#205c37] text-white px-5 py-2 rounded-lg font-semibold mt-auto w-fit">
              Assign Trainers
            </button>
          </div>
          {/* Trainer and NCC Camp Locations Card */}
          <div className="bg-[#f1faee] rounded-xl shadow p-6 flex flex-col h-full">
            <h2 className="text-2xl font-bold text-[#205c37] mb-4">
              Trainer and NCC Camp Locations
            </h2>
            <div className="flex gap-4">
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
              {/* Analytics Placeholders */}
              <div className="flex flex-col flex-1 gap-2">
                <div className="bg-[#e9f5e1] rounded-lg flex items-center justify-center h-1/2 p-2">
                  {/* Bar Chart Placeholder */}
                  <div className="w-full">
                    <p className="text-[#205c37] text-sm font-semibold mb-1">
                      Performance Analytics
                    </p>
                    <svg width="100%" height="40" viewBox="0 0 100 40">
                      <rect x="5" y="30" width="10" height="10" fill="#205c37" />
                      <rect x="20" y="25" width="10" height="15" fill="#205c37" />
                      <rect x="35" y="20" width="10" height="20" fill="#205c37" />
                      <rect x="50" y="15" width="10" height="25" fill="#205c37" />
                      <rect x="65" y="10" width="10" height="30" fill="#205c37" />
                    </svg>
                  </div>
                </div>
                <div className="flex gap-2 h-1/2">
                  {/* Pie Chart Placeholder */}
                  <div className="bg-[#e9f5e1] rounded-lg flex items-center justify-center flex-1 p-2">
                    <svg width="40" height="40" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="18" fill="#b7e4c7" />
                      <path d="M20 20 L20 2 A18 18 0 0 1 38 20 Z" fill="#205c37" />
                    </svg>
                  </div>
                  {/* Line Chart Placeholder */}
                  <div className="bg-[#e9f5e1] rounded-lg flex items-center justify-center flex-1 p-2">
                    <svg width="40" height="40" viewBox="0 0 40 40">
                      <polyline
                        points="5,35 10,25 20,30 30,10 35,15"
                        fill="none"
                        stroke="#205c37"
                        strokeWidth="3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> {/* End grid */}
    </div>
  );
}
