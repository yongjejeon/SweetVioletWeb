import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Selector from '../components/Selector';
import Button from '../components/Button';

const Question3 = () => {
  const {
    activityLevel,
    setActivityLevel,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const goToQuestion4 = () => {
    navigate('/Question4');
  };

  const goToQuestion2 = () => {
    navigate('/Question2');
  };

  const data = [
    {
      title: 'What Is Your Activity Level?',
    },
  ];

  // Styling for the container (fixed 200px from the top)
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column', // Stack everything vertically
    alignItems: 'center', // Center content horizontally
    position: 'fixed', // Fix the container's position relative to the page
    top: '200px', // 200px from the top of the page
    left: '50%', // Center the container horizontally
    transform: 'translateX(-50%)', // Correct horizontal centering with transform
    width: '100%', // Make sure the container takes full width
    boxSizing: 'border-box', // Include padding in the width calculation
    paddingTop: '20px', // Additional padding at the top
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
    fontFamily: 'Roboto, sans-serif', // Use Roboto for the body
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
    display: 'flex', // Enable flexbox
    justifyContent: 'space-between', // Space out the buttons
    width: '100%', // Make buttons take up full width
    maxWidth: '600px', // Limit max width to align with the card
    marginTop: '20px', // Add some space between the card and buttons
    gap: '20px', // Add gap between the buttons
  };

  return (
    <div style={containerStyle}>
      {/* Mimic the card for Selector */}
      <div style={cardStyle}>
        <h2 style={titleStyle}>{data[0].title}</h2>
        {/* Add the Selector inside the styled box */}
        <div>
          <Selector
            options={['Minimal', 'Moderate', 'Very Active']}
            onSelect={setActivityLevel}
            multiple={false}
          />
        </div>
      </div>

      {/* Button container to display Prev and Next buttons horizontally */}
      <div style={buttonContainerStyle}>
        <Button
          className="button"
          label="Prev"
          onClick={goToQuestion2}
        />
        <Button
          className="button"
          label="Next"
          onClick={goToQuestion4}
          disabled={!activityLevel || activityLevel.length === 0}
        />
      </div>
    </div>
  );
};

export default Question3;
