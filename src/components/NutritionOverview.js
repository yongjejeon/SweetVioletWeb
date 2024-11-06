// src/components/NutritionOverview.js
import React from 'react';

const NutritionOverview = ({ calories, carbs, protein, fat }) => {
  return (
    <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', textAlign: 'center', backgroundColor: '#e0e0e0' }}>
      <h3>Nutrition Overview</h3>
      <p>{calories} Calories</p>
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px', backgroundColor: '#d0d0d0' }}>
        <div style={{ flex: 1, padding: '10px', backgroundColor: '#c0c0c0' }}>Carbs: {carbs}</div>
        <div style={{ flex: 1, padding: '10px', backgroundColor: '#b0b0b0' }}>Protein: {protein}</div>
        <div style={{ flex: 1, padding: '10px', backgroundColor: '#a0a0a0' }}>Fat: {fat}</div>
        <div style={{ flex: 1, padding: '10px', backgroundColor: '#909090' }}>ETC</div>
      </div>
    </div>
  );
};

export default NutritionOverview;
