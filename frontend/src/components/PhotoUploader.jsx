import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Fix default icon issue with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const PhotoUploader = () => {
  const [file, setFile] = useState(null);
  const [location, setLocation] = useState('');
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);

    try {
      setLoading(true);
      setLocation('');
      setCoords(null);

      const res = await axios.post('http://localhost:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setLocation(res.data.location);
      setCoords(res.data.coordinates);
    } catch (err) {
      console.error(err);
      alert('Prediction failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-lg">
        <h1 className="text-2xl font-semibold mb-4 text-center">Photo Location Predictor</h1>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full p-2 bg-gray-700 rounded-md mb-4 text-white cursor-pointer"
        />

        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className="w-full bg-green-600 hover:bg-green-700 transition-all py-2 rounded-md cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Predicting...' : 'Predict Location'}
        </button>

        {location && (
          <div className="mt-6 p-4 bg-gray-700 rounded-md">
            <p className="text-lg font-medium text-green-400">Location:</p>
            <p className="break-words text-white mt-1 mb-4">{location}</p>

            {coords && (
              <MapContainer
                center={[coords.latitude, coords.longitude]}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: "300px", width: "100%", borderRadius: "10px" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[coords.latitude, coords.longitude]}>
                  <Popup>{location}</Popup>
                </Marker>
              </MapContainer>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoUploader;
