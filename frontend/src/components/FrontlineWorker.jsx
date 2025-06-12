// FrontlineWorker.jsx
import React from 'react';

const workers = [
  { name: 'Amit Sharma', phone: '9876543210', location: 'Delhi' },
  { name: 'Sita Reddy', phone: '9123456780', location: 'Hyderabad' },
];

const FrontlineWorker = () => {
  return (
    <div style={{ padding: '1rem', backgroundColor: '#fff3cd', borderRadius: '10px', margin: '1rem 0' }}>
      <h3 style={{ color: '#856404' }}>Nearest Frontline Worker</h3>
      <p><strong>{workers[0].name}</strong></p>
      <p>📍 {workers[0].location}</p>
      <p>📞 {workers[0].phone}</p>
    </div>
  );
};

export default FrontlineWorker;
