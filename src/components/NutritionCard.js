// NutritionCard.js
import React from 'react';

const NutritionCard = ({ nutritionData }) => {
  const nutritionOverviewStyle = {
    marginBottom: '20px',
  };

  const nutritionContainerStyle = {
    display: 'flex',
    overflowX: 'auto',
    padding: '10px',
    gap: '20px',
    justifyContent: 'flex-start', // Allows items to start from the left
    maxWidth: '100%', // Ensures it doesn't take more than available width
  };

  const nutritionCardStyle = {
    width: '200px',
    height: '120px',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const titleStyle = {
    fontSize: '1.2rem',
    marginBottom: '8px',
    color: '#333',
    fontWeight: 'bold',
  };

  const valueStyle = {
    fontSize: '1.1rem',
    color: '#666',
  };

  const sectionTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: '10px',
    color: '#333',
  };

  return (
    <div style={nutritionOverviewStyle}>
      <div style={sectionTitleStyle}>Nutrition Overview</div>
      <div style={nutritionContainerStyle}>
        {nutritionData.map((item, index) => (
          <div key={index} style={nutritionCardStyle}>
            <div style={titleStyle}>{item.label}</div>
            <div style={valueStyle}>{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionCard;
