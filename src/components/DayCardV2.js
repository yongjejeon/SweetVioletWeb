import React, { useState } from 'react';

const DayCard = ({ day, meals }) => {
  const [isHovered, setIsHovered] = useState(false);

  const dayCardStyle = {
    width: '300px',
    height: '800px', // Fixed height for consistency
    marginRight: '20px',
    flexShrink: 0,
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '15px',
    boxShadow: isHovered
      ? '0 8px 20px rgba(0, 0, 0, 0.2)'
      : '0 4px 10px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
    overflow: 'hidden', // Hide overflowing content
  };

  const titleStyle = {
    fontSize: '1.8rem',
    marginBottom: '0px',
    color: '#6A4C9C',
    fontWeight: 'bold',
  };

  const mealHeaderStyle = {
    fontSize: '1.2rem',
    marginTop: '20px',
    marginBottom: '8px',
    color: '#4A3070',
    fontWeight: 'bold',
    textAlign: 'left',
    margin: 0,
    paddingLeft: '0',
  };

  const detailRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    fontSize: '1rem',
    color: '#555',
  };

  const detailTitleStyle = {
    fontWeight: 'bold',
    color: '#6A4C9C',
  };

  const detailValueStyle = {
    textAlign: 'right',
    color: '#333',
  };

  const dividerStyle = {
    height: '1px',
    backgroundColor: '#e0e0e0',
    margin: '5px 0',
    border: 'none',
  };

  const getMealType = (meal) => {
    if (meal.type === 'breakfast') return 'Breakfast';
    if (meal.type === 'lunch') return 'Lunch';
    if (meal.type === 'dinner') return 'Dinner';
    return 'Meal';
  };

  return (
    <div
      style={dayCardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 style={titleStyle}>Day {day}</h3>

      {meals.map((meal, index) => {
        const recipeName = meal?.Recipe_Name || 'Recipe Name Not Available';
        const calories = meal?.calories ? `${Math.round(meal.calories)} kcal` : 'Calories not available';
        const cuisineType = meal?.cuisine_type || 'Cuisine type not available';
        const dietLabels = meal?.diet_labels?.join(', ') || 'Diet labels not available';

        const mealType = getMealType(meal);

        return (
          <div key={index}>
            <div style={mealHeaderStyle}>{mealType}</div>

            <div style={detailRowStyle}>
              <span style={detailTitleStyle}>Recipe Name:</span>
              <span style={detailValueStyle}>{recipeName}</span>
            </div>
            <hr style={dividerStyle} />

            <div style={detailRowStyle}>
              <span style={detailTitleStyle}>Calories:</span>
              <span style={detailValueStyle}>{calories}</span>
            </div>
            <hr style={dividerStyle} />

            <div style={detailRowStyle}>
              <span style={detailTitleStyle}>Cuisine Type:</span>
              <span style={detailValueStyle}>{cuisineType}</span>
            </div>
            <hr style={dividerStyle} />

            <div style={detailRowStyle}>
              <span style={detailTitleStyle}>Diet Labels:</span>
              <span style={detailValueStyle}>{dietLabels}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DayCard;
