import React, { useState } from 'react';

const DayCard = ({ day, meals }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Styles for the component
  const containerStyle = {
    display: 'flex',
    gap: '20px', // Space between DayCards
    padding: '20px',
    overflowX: 'auto', // Horizontal scrolling
  };

  const dayCardStyle = {
    backgroundColor: '#FFFFFF',
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    margin: '15px',
    width: '350px', // Fixed width for consistent alignment
    height: '90%'
  };

  const titleStyle = {
    fontSize: '1.8rem',
    marginBottom: '15px',
    color: '#6A4C9C',
    fontWeight: 'bold',
    textAlign: 'center',
  };

  const mealCardStyle = {
    backgroundColor: '#FFF',
    padding: '15px', // Extra padding for breathing room
    borderRadius: '12px',
    marginBottom: '20px', // Space between meals

  };

  const mealContainerStyle = {
    display: 'flex',
    flexDirection: 'column', // Stacks meals vertically
    gap: '15px', // Space between meal cards
  };

  const mealHeaderContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  };

  const mealHeaderStyle = {
    fontSize: '16px',
    fontWeight: '600',
    textTransform: 'capitalize', // Ensure meal type is capitalized
    color: '#4A3070',
  };

  const recipeNameStyle = {
    fontSize: '15px',
    fontWeight: '500',
    color: '#333333',
  };

  const detailRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
  };

  const detailTitleStyle = {
    fontWeight: '600',
    fontSize: '14px',
    color: '#6A4C9C',
  };

  const detailValueStyle = {
    fontWeight: '400',
    fontSize: '14px',
    color: '#4A4A4A',
    textAlign: 'right',
  };

  const dividerStyle = {
    height: '1px',
    backgroundColor: '#e0e0e0',
    margin: '5px 0',
    border: 'none',
  };

  const getMealType = (meal) => {
    const type = meal.type || 'Meal';
    return type.charAt(0).toUpperCase() + type.slice(1); // Capitalize first letter
  };

  // Component rendering
  return (
    <div
    style={{
      ...dayCardStyle,
      boxShadow: isHovered ? '0px 4px 15px rgba(106, 76, 156, 0.3)' : mealCardStyle.boxShadow,
      transform: isHovered ? 'scale(1.02)' : 'scale(1)',
    }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 style={titleStyle}>Day {day}</h3>

      <div   style={mealCardStyle}>
        {meals.map((meal, index) => {
          const recipeName = meal?.Recipe_Name || 'Recipe Name Not Available';
          const cuisineType = meal?.cuisine_type || 'Cuisine type not available';
          const dietLabels = meal?.diet_labels?.join(', ') || 'Diet labels not available';

          return (
            <div key={index} style={mealCardStyle}>
              <div style={mealHeaderContainerStyle}>
                <span style={mealHeaderStyle}>{getMealType(meal)}: {recipeName}</span>
              </div>
              <hr style={dividerStyle} />
              <div>
                <div style={detailRowStyle}>
                  <span style={detailTitleStyle}>Cuisine Type:</span>
                  <span style={detailValueStyle}>{cuisineType}</span>
                </div>
                <div style={detailRowStyle}>
                  <span style={detailTitleStyle}>Diet Labels:</span>
                  <span style={detailValueStyle}>{dietLabels}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DayCard;
