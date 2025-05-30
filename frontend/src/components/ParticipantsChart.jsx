import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from "recharts";

const ParticipantsChart = () => {
  const [data, setData] = useState([]);

  // Aggregate participation data
  useEffect(() => {
    const syncData = () => {
      const opportunities = JSON.parse(localStorage.getItem("opportunities") || "[]");
      const participationKeys = Object.keys(localStorage).filter(key => key.startsWith("participation_"));
      const allParticipations = participationKeys.map(key => JSON.parse(localStorage.getItem(key) || "[]"));
      const counts = opportunities.map(op => {
        const count = allParticipations.reduce(
          (sum, arr) => sum + (arr.includes(op.id) ? 1 : 0),
          0
        );
        return {
          name: op.title.length > 18 ? op.title.slice(0, 16) + "…" : op.title,
          participants: count,
        };
      });
      setData(counts);
    };
    syncData();
    window.addEventListener("opportunitiesChanged", syncData);
    window.addEventListener("storage", syncData);
    return () => {
      window.removeEventListener("opportunitiesChanged", syncData);
      window.removeEventListener("storage", syncData);
    };
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center mt-8">
      <h3 className="text-xl font-bold mb-4 text-green-800">Participants per Opportunity</h3>
      {data.length === 0 ? (
        <div className="text-gray-500">No data to display.</div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-18} textAnchor="end" interval={0} height={60} tick={{ fontSize: 13 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="participants" fill="#27ae60" radius={[8, 8, 0, 0]}>
              <LabelList dataKey="participants" position="top" fontSize={14} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ParticipantsChart;
