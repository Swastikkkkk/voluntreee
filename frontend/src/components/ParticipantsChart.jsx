import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import { db } from "../config/firebase";
import { collection, getDocs, query, orderBy, onSnapshot } from "firebase/firestore";

const ParticipantsChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let unsubscribeParticipation;

    const fetchData = async () => {
      // 1. Fetch all opportunities (can use getDocs since opportunities change less often)
      const opportunitiesQuery = query(collection(db, "opportunities"), orderBy("date", "desc"));
      const opportunitiesSnapshot = await getDocs(opportunitiesQuery);
      const opportunities = opportunitiesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

      // 2. Listen for real-time changes in participation
      const participationQuery = collection(db, "participation");
      unsubscribeParticipation = onSnapshot(participationQuery, (snapshot) => {
        const allParticipations = [];
        snapshot.forEach(doc => {
          const confirmed = doc.data().confirmedOpportunities || [];
          allParticipations.push(...confirmed);
        });

        // 3. Count participation per opportunity
        const counts = opportunities.map(op => {
          const count = allParticipations.filter(id => id === op.id).length;
          return {
            name: op.title.length > 18 ? op.title.slice(0, 16) + "…" : op.title,
            participants: count,
          };
        });
        console.log("Chart data:", counts); // Debug log
        setData(counts);
      });
    };

    fetchData();

    // Cleanup
    return () => {
      if (unsubscribeParticipation) unsubscribeParticipation();
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
