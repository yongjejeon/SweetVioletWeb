import React from 'react';

const DayCard = ({ day, meals }) => {
  // Day card styles
  const dayCardStyle = {
    width: '300px',
    marginRight: '20px',
    flexShrink: 0,
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '15px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    display: 'flex', // Flexbox for vertical alignment
    flexDirection: 'column', // Stack the content vertically
    justifyContent: 'space-between', // Evenly distribute content
    minHeight: '200px', // Fix the height to make the cards consistent
  };

  const titleStyle = {
    fontSize: '1.8rem',
    marginBottom: '0px',
    color: '#6A4C9C', // Purple accent for the title
    fontWeight: 'bold',
  };

  const mealHeaderStyle = {
    fontSize: '1.2rem',
    marginTop: '20px', // Increased margin for more space between meal types
    marginBottom: '8px',
    color: '#4A3070', // Darker purple for meal headers
    fontWeight: 'bold',
    textAlign: 'left', // Ensure alignment with line items
    margin: 0, // Remove default margin to avoid indentation
    paddingLeft: '0', // Ensure no left padding for alignment
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
    color: '#6A4C9C', // Purple for the titles
  };

  const detailValueStyle = {
    textAlign: 'right',
    color: '#333', // Neutral dark grey for values
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
    <div style={dayCardStyle}>
      <h3 style={titleStyle}>Day {day}</h3> {/* Changed to "Day {day}" */}

      {/* Map through meals and dynamically add meal headers and details */}
      {meals.map((meal, index) => {
        const recipeName = meal?.Recipe_Name || 'Recipe Name Not Available';
        const calories = meal?.calories ? `${Math.round(meal.calories)} kcal` : 'Calories not available';
        const cuisineType = meal?.cuisine_type || 'Cuisine type not available';
        const dietLabels = meal?.diet_labels?.join(', ') || 'Diet labels not available';

        const mealType = getMealType(meal);

        return (
          <div key={index}>
            {/* Use div instead of h4 to avoid indentation */}
            <div style={mealHeaderStyle}>{mealType}</div>

            {/* Detail Rows */}
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
