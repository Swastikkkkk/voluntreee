import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";

const VolunteerProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    hoursLastWeek: "",
    currentProject: "",
    skills: "",
    city: ""
  });

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
          setForm({
            hoursLastWeek: docSnap.data().hoursLastWeek || "",
            currentProject: docSnap.data().currentProject || "",
            skills: docSnap.data().skills || "",
            city: docSnap.data().city || ""
          });
        } else {
          setProfile(null);
        }
      } catch (error) {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Save profile updates to Firestore
  const handleSave = async () => {
    try {
      await updateDoc(doc(db, "users", id), {
        hoursLastWeek: form.hoursLastWeek,
        currentProject: form.currentProject,
        skills: form.skills,
        city: form.city
      });
      setProfile({ ...profile, ...form });
      setEditMode(false);
      alert("Profile updated!");
    } catch (error) {
      alert("Failed to update profile.");
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!profile) return <div className="p-8 text-red-600 font-bold">Profile not found.</div>;

  // Only allow editing if the logged-in user is viewing their own profile
  const canEdit = auth.currentUser && auth.currentUser.uid === id;

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white rounded-xl shadow p-8">
      <div className="flex items-center gap-6 mb-6">
        <img
          src={"https://randomuser.me/api/portraits/lego/1.jpg"}
          alt={profile.name || "Volunteer"}
          className="w-24 h-24 rounded-full"
        />
        <div>
          <h2 className="text-2xl font-bold text-green-800">
            {profile.name || "No Name"}
          </h2>
          <div className="text-green-700">{profile.email || "No Email"}</div>
        </div>
      </div>

      {editMode ? (
        <div className="space-y-4">
          <div>
            <label className="font-semibold">Hours Worked Last Week:</label>
            <input
              type="number"
              name="hoursLastWeek"
              value={form.hoursLastWeek}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl"
              min={0}
            />
          </div>
          <div>
            <label className="font-semibold">Current Project:</label>
            <input
              type="text"
              name="currentProject"
              value={form.currentProject}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl"
            />
          </div>
          <div>
            <label className="font-semibold">Skills:</label>
            <input
              type="text"
              name="skills"
              value={form.skills}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl"
              placeholder="e.g. Teaching, Event Management"
            />
          </div>
          <div>
            <label className="font-semibold">City:</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl"
            />
          </div>
          <button
            onClick={handleSave}
            className="mt-4 px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
          >
            Save
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="mt-4 ml-4 px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-2">
            <strong>Hours Worked Last Week:</strong>{" "}
            {profile.hoursLastWeek !== undefined ? profile.hoursLastWeek : "Not set"}
          </div>
          <div className="mb-2">
            <strong>Current Project:</strong>{" "}
            {profile.currentProject || "Not set"}
          </div>
          <div className="mb-2">
            <strong>Skills:</strong>{" "}
            {profile.skills || "Not set"}
          </div>
          <div className="mb-2">
            <strong>City:</strong>{" "}
            {profile.city || "Not set"}
          </div>
          {canEdit && (
            <button
              onClick={() => setEditMode(true)}
              className="mt-4 px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
            >
              Edit Profile
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default VolunteerProfile;
