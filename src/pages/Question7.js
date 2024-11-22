import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Button from '../components/Button';
import Selector from '../components/Selector'; // Import the Selector component

const Question7 = () => {
  const {
    preferredCuisine,
    setPreferredCuisine,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const goToQuestion6 = () => {
    navigate('/Question6');
  };

  const goToQuestion8 = () => {
    navigate('/Question8');
  };

  const data = [
    {
      title: 'What Is Your Preferred Cuisine?',
    },
  ];

  // Styling for the container (fixed 200px from the top)
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'fixed',
    top: '200px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    boxSizing: 'border-box',
    paddingTop: '20px',
  };

  // Mimicking the card style
  const cardStyle = {
    backgroundColor: '#90a5a0', // Pale purple background
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    padding: '20px',
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Roboto, sans-serif',
  };

  const titleStyle = {
    fontSize: '2rem', // Increased font size
    marginBottom: '15px',
    color: 'white', // Updated title color
    fontWeight: 'bold',
    fontFamily: 'Poppins, sans-serif', // Poppins for the title
  };

  // Styling for the button container to align buttons horizontally
  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '600px',
    marginTop: '20px',
    gap: '20px',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>{data[0].title}</h2>
        {/* Selector component for predefined cuisine types */}
        <Selector
          options={[
            'American',
            'Asian',
            'British',
            'Caribbean',
            'Central Europe',
            'Chinese',
            'Eastern Europe',
            'French',
            'Greek',
            'Indian',
            'Italian',
            'Japanese',
            'Korean',
            'Kosher',
            'Mediterranean',
            'Mexican',
            'Middle Eastern',
            'Nordic',
            'South American',
            'South East Asian',
            'World',
          ]}
          onSelect={setPreferredCuisine} // Update context with selected value
          selected={preferredCuisine} // Current selection
          multiple={true}
        />
      </div>

      <div style={buttonContainerStyle}>
        <Button
          className="button"
          label="Prev"
          onClick={goToQuestion6}
        />
        <Button
          className="button"
          label="Next"
          onClick={goToQuestion8}
          disabled={!preferredCuisine} // Disable Next if nothing is selected
        />
      </div>
    </div>
  );
};

export default Question7;
