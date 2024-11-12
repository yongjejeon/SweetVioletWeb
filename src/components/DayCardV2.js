import React from 'react';

const DayCard = ({ day, meals }) => {
  // Styles for the DayCard component
  const dayCardStyle = {
    width: '300px',
    marginRight: '20px',
    flexShrink: 0,
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  };

  const titleStyle = {
    fontSize: '1.5rem',
    marginBottom: '15px',
    color: '#333',
  };

  const mealHeaderStyle = {
    fontSize: '1.2rem',
    marginTop: '15px',
    marginBottom: '8px',
    color: '#555',
  };

  const mealDetailStyle = {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '5px',
  };

  // Function to get the meal type from the meal position (index)
  const getMealType = (index) => {
    if (index === 0) return 'Breakfast';
    if (index === 1) return 'Lunch';
    if (index === 2) return 'Dinner';
    return 'Meal type not available';
  };

  return (
    <div style={dayCardStyle}>
      <h3 style={titleStyle}>{day}</h3>

      {/* Map through meals and dynamically add headers for meal types */}
      {meals.map((meal, index) => {
        const recipeName = meal?.Recipe_Name || 'Recipe Name Not Available';
        const calories = meal?.calories ? `${meal.calories} kcal` : 'Calories not available';
        const cuisineType = meal?.cuisine_type || 'Cuisine type not available';
        const dietLabels = meal?.diet_labels?.join(', ') || 'Diet labels not available';

        // Get meal type based on index (Breakfast, Lunch, or Dinner)
        const mealType = getMealType(index);

        return (
          <div key={index}>
            {/* Meal type header (based on index) */}
            <h4 style={mealHeaderStyle}>{mealType}</h4>
            <div style={mealDetailStyle}>
              <strong>Recipe Name:</strong> {recipeName}
            </div>
            <div style={mealDetailStyle}>
              <strong>Calories:</strong> {calories}
            </div>
            <div style={mealDetailStyle}>
              <strong>Cuisine Type:</strong> {cuisineType}
            </div>
            <div style={mealDetailStyle}>
              <strong>Diet Labels:</strong> {dietLabels}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DayCard;
