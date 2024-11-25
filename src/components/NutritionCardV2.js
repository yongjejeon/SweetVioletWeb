import React from 'react';

const NutritionCard = ({ nutritionData }) => {
  // Function to format numbers with comma separators and round them
  const formatNumber = (number) => {
    // Round the number and apply comma formatting
    return new Intl.NumberFormat().format(Math.round(number));
  };

  const nutritionOverviewStyle = {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Centers content horizontally
  };

  const nutritionContainerStyle = {
    display: 'flex',
    overflowX: 'auto',
    padding: '10px',
    gap: '20px',
    justifyContent: 'center', // Centers items within the container
    maxWidth: '100%',
  };

  const nutritionCardStyle = {
    width: '200px', // Keep the original width
    height: '120px', // Keep the original height
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Adjust box shadow to match the DayCard style
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const sectionTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center', // Center-aligns section title
    marginBottom: '10px',
    color: '#6A4C9C', // Use the same purple color as DayCard
  };

  const titleStyle = {
    fontSize: '1.2rem',
    marginBottom: '8px',
    color: '#4A3070', // Darker purple for labels
    fontWeight: 'bold',
  };

  const valueStyle = {
    fontSize: '1.1rem',
    color: '#333', // Neutral color for values
  };

  return (
    <div style={nutritionOverviewStyle}>
      <div style={sectionTitleStyle}>Nutrition Overview</div>
      <div style={nutritionContainerStyle}>
        {nutritionData.map((item, index) => (
          <div key={index} style={nutritionCardStyle}>
            <div style={titleStyle}>{item.label}</div>
            <div style={valueStyle}>
              {item.value ? formatNumber(item.value) : 'N/A'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionCard;
