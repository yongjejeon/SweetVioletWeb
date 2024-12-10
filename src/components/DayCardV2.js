import React, { useState } from 'react';

const DayCard = ({ day, meals }) => {
  const [isHovered, setIsHovered] = useState(false);

  const dayCardStyle = {
    backgroundColor: '#FFFFFF',
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    margin: '15px',
    width: '350px',
    height: '85%',
  };

  const titleStyle = {
    fontSize: '1.8rem',
    marginBottom: '15px',
    color: '#6A4C9C',
    fontWeight: 'bold',
    textAlign: 'center',
  };

  const mealCardStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px', // Space between meals
  };

  const mealItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  };

  const mealTypeStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#4A3070',
    marginBottom: '5px',
  };

  const recipeNameStyle = {
    fontSize: '14px',
    fontWeight: 'normal',
    color: '#333333',
    marginBottom: '10px',
  };

  const dividerStyle = {
    height: '1px',
    backgroundColor: '#e0e0e0',
    width: '100%',
    margin: '10px 0',
  };

  const getMealType = (meal) => {
    const type = meal.type || 'Meal';
    return type.charAt(0).toUpperCase() + type.slice(1); // Capitalize first letter
  };

  return (
    <div
      style={{
        ...dayCardStyle,
        boxShadow: isHovered
          ? '0px 4px 15px rgba(106, 76, 156, 0.3)'
          : dayCardStyle.boxShadow,
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 style={titleStyle}>Day {day}</h3>
      <div style={mealCardStyle}>
        {meals.map((meal, index) => (
          <div key={index}>
            <div style={mealItemStyle}>
              <span style={mealTypeStyle}>{getMealType(meal)}</span>
              <span style={recipeNameStyle}>{meal?.Recipe_Name || 'Recipe Name Not Available'}</span>
            </div>
            {index < meals.length - 1 && <div style={dividerStyle}></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayCard;
