import React from 'react';

const NutritionOverview = ({ calories, carbs, protein, fat }) => {

  // Styles for the entire component
  const nutritionOverviewStyle = {
    marginBottom: '20px',
  };

  // Styles for the nutrition cards container to make it scrollable
  const nutritionContainerStyle = {
    display: 'flex', // Use flexbox to layout the cards horizontally
    overflowX: 'auto', // Make it horizontally scrollable if it overflows
    padding: '10px',
    gap: '20px', // Space between the cards
    justifyContent: 'center', // Center the cards horizontally
  };

  // Styling for each nutrition card
  const nutritionCardStyle = {
    width: '200px', // Set a consistent width for each card
    height: '120px', // Set a smaller height for the cards
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Light shadow for card depth
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  // Styling for the title inside each card
  const titleStyle = {
    fontSize: '1.2rem',
    marginBottom: '8px',
    color: '#333',
    fontWeight: 'bold',
  };

  // Styling for the value text inside each card
  const valueStyle = {
    fontSize: '1.1rem',
    color: '#666',
  };

  // Centered title style for the section
  const sectionTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    position: 'relative', // No fixed positioning, relative to the container
    left: '50%',
    transform: 'translateX(-50%)', // Center the title horizontally
    marginBottom: '10px', // Add space below the title to separate it from cards
    color: '#333',
  };

  return (
    <div style={nutritionOverviewStyle}>
      {/* Section Title (Centered within the nutrition section) */}
      <div style={sectionTitleStyle}>
        Nutrition Overview
      </div>
      
      {/* Nutrition Cards Container (scrollable) */}
      <div style={nutritionContainerStyle}>
        <div style={nutritionCardStyle}>
          <div style={titleStyle}>Calories</div>
          <div style={valueStyle}>{calories}</div>
        </div>
        <div style={nutritionCardStyle}>
          <div style={titleStyle}>Carbs</div>
          <div style={valueStyle}>{carbs}</div>
        </div>
        <div style={nutritionCardStyle}>
          <div style={titleStyle}>Protein</div>
          <div style={valueStyle}>{protein}</div>
        </div>
        <div style={nutritionCardStyle}>
          <div style={titleStyle}>Fat</div>
          <div style={valueStyle}>{fat}</div>
        </div>
      </div>
    </div>
  );
};

export default NutritionOverview;
