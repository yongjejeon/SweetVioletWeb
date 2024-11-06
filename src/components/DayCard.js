import React from 'react';

const DayCard = ({ day, meals, totalPrice }) => {
  // Inline styles for DayCard component
  const dayCardStyle = {
    width: '300px', // Set the width of each card
    marginRight: '20px', // Space between cards
    flexShrink: 0, // Prevent cards from shrinking
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  };

  const titleStyle = {
    fontSize: '1.5rem',
    marginBottom: '10px',
    color: '#333',
  };

  const mealTextStyle = {
    marginBottom: '5px',
    fontSize: '1rem',
    color: '#666',
  };

  const totalPriceStyle = {
    marginTop: '10px',
    fontWeight: 'bold',
    color: '#333',
  };

  return (
    <div style={dayCardStyle}>
      <h3 style={titleStyle}>{day}</h3>
      <div style={mealTextStyle}>
        <strong>Breakfast:</strong> {meals.breakfast.name}
      </div>
      <div style={mealTextStyle}>
        <strong>Lunch:</strong> {meals.lunch.name}
      </div>
      <div style={mealTextStyle}>
        <strong>Dinner:</strong> {meals.dinner.name}
      </div>
      <div style={totalPriceStyle}>
        <strong>Total Price for the Day: </strong>${totalPrice.toFixed(2)}
      </div>
    </div>
  );
};

export default DayCard;
