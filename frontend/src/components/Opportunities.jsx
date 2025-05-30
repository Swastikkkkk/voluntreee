import React, { useState } from "react";

// Initial mock data
const initialOpportunities = [
  {
    id: "1",
    title: "Beach Cleanup",
    description: "Join us to clean the city beach.",
    date: "2025-06-10",
    time: "09:00",
    location: "Juhu Beach, Mumbai"
  },
  {
    id: "2",
    title: "Tree Plantation Drive",
    description: "Help us plant 1000 trees in the city park.",
    date: "2025-06-15",
    time: "08:30",
    location: "Central Park, Delhi"
  },
  {
    id: "3",
    title: "Old Age Home Visit",
    description: "Spend time with elders and bring smiles.",
    date: "2025-06-20",
    time: "15:00",
    location: "Sunrise Old Age Home, Pune"
  },
  {
    id: "4",
    title: "Blood Donation Camp",
    description: "Donate blood and save lives.",
    date: "2025-06-25",
    time: "10:00",
    location: "Red Cross Center, Bangalore"
  },
  {
    id: "5",
    title: "Animal Shelter Help",
    description: "Assist in taking care of rescued animals.",
    date: "2025-07-01",
    time: "11:00",
    location: "Happy Paws Shelter, Hyderabad"
  }
];

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [selectedIds, setSelectedIds] = useState([]);
  const [newOpp, setNewOpp] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: ""
  });

  // Checkbox select/deselect
  const handleCheckbox = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  // Remove selected opportunities
  const handleRemove = () => {
    setOpportunities((prev) => prev.filter((op) => !selectedIds.includes(op.id)));
    setSelectedIds([]);
  };

  // Add new opportunity
  const handleAdd = (e) => {
    e.preventDefault();
    if (!newOpp.title || !newOpp.date || !newOpp.time || !newOpp.location) return;
    setOpportunities((prev) => [
      ...prev,
      { ...newOpp, id: Date.now().toString() }
    ]);
    setNewOpp({
      title: "",
      description: "",
      date: "",
      time: "",
      location: ""
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow mt-8">
      <h2 className="text-2xl font-bold mb-4 text-green-800">Volunteer Opportunities</h2>
      <form onSubmit={handleAdd} className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-2">
        <input
          className="border p-2 rounded"
          placeholder="Title"
          value={newOpp.title}
          onChange={e => setNewOpp({ ...newOpp, title: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Description"
          value={newOpp.description}
          onChange={e => setNewOpp({ ...newOpp, description: e.target.value })}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={newOpp.date}
          onChange={e => setNewOpp({ ...newOpp, date: e.target.value })}
        />
        <input
          type="time"
          className="border p-2 rounded"
          value={newOpp.time}
          onChange={e => setNewOpp({ ...newOpp, time: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Location"
          value={newOpp.location}
          onChange={e => setNewOpp({ ...newOpp, location: e.target.value })}
        />
        <button
          type="submit"
          className="col-span-1 md:col-span-5 bg-green-700 hover:bg-green-800 text-white py-2 rounded mt-2"
        >
          Add Opportunity
        </button>
      </form>
      <div>
        {opportunities.length === 0 && (
          <div className="text-gray-500">No opportunities available.</div>
        )}
        {opportunities.map((op) => (
          <div
            key={op.id}
            className="flex items-center gap-4 border-b py-3"
          >
            <input
              type="checkbox"
              checked={selectedIds.includes(op.id)}
              onChange={() => handleCheckbox(op.id)}
              className="accent-green-700"
            />
            <div className="flex-1">
              <div className="font-semibold text-green-900">{op.title}</div>
              <div className="text-sm text-gray-700">{op.description}</div>
              <div className="text-xs text-gray-500">
                {op.date} at {op.time} | {op.location}
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedIds.length > 0 && (
        <button
          onClick={handleRemove}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Remove Selected
        </button>
      )}
    </div>
  );
};

export default Opportunities;
