// src/components/DayCard.js
import React from 'react';

const DayCard = ({ day }) => {
  return (
    <div style={{ minWidth: '200px', padding: '20px', border: '1px solid #ccc', marginRight: '10px', textAlign: 'center', backgroundColor: '#f0f0f0' }}>
      <h3>Day {day}</h3>
      <p>Breakfast:</p>
      <p>Lunch:</p>
      <p>Dinner:</p>
      <p>$ Expected Price:</p>
    </div>
  );
};

export default DayCard;
