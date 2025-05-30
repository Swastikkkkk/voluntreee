import React, { useState, useEffect } from "react";

const STORAGE_KEY = "opportunities";
const getOpportunities = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};
const saveOpportunities = (ops) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ops));
  window.dispatchEvent(new Event("opportunitiesChanged"));
};

const OpportunitiesSection = () => {
  const [opportunities, setOpportunities] = useState(getOpportunities());
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: ""
  });

  useEffect(() => {
    const sync = () => setOpportunities(getOpportunities());
    window.addEventListener("opportunitiesChanged", sync);
    return () => window.removeEventListener("opportunitiesChanged", sync);
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.time || !form.location) return;
    const newOp = {
      ...form,
      id: Date.now().toString()
    };
    const updated = [newOp, ...opportunities];
    setOpportunities(updated);
    saveOpportunities(updated);
    setForm({ title: "", description: "", date: "", time: "", location: "" });
  };

  const handleRemove = (id) => {
    const updated = opportunities.filter((op) => op.id !== id);
    setOpportunities(updated);
    saveOpportunities(updated);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8">
      <h2 className="text-xl font-bold mb-4 text-green-800">Post Volunteer Opportunities</h2>
      <form onSubmit={handleAdd} className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-2">
        <input
          className="border p-2 rounded"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
        />
        <input
          type="time"
          className="border p-2 rounded"
          value={form.time}
          onChange={e => setForm({ ...form, time: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Location"
          value={form.location}
          onChange={e => setForm({ ...form, location: e.target.value })}
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
          <div className="text-gray-500">No opportunities posted yet.</div>
        )}
        {opportunities.map((op) => (
          <div
            key={op.id}
            className="flex items-center gap-4 border-b py-3"
          >
            <div className="flex-1">
              <div className="font-semibold text-green-900">{op.title}</div>
              <div className="text-sm text-gray-700">{op.description}</div>
              <div className="text-xs text-gray-500">
                {op.date} at {op.time} | {op.location}
              </div>
            </div>
            <button
              onClick={() => handleRemove(op.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpportunitiesSection;
