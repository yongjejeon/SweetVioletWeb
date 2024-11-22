import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Selector from '../components/Selector';
import Button from '../components/Button';

const Question0 = () => {
  const { gender, setGender } = useContext(AppContext);
  const navigate = useNavigate();

  const goToQuestion1 = () => {
    navigate('/Question1');
  };

  const data = [
    {
      title: 'What Is Your Sex?',
    },
  ];

  // Styling for the container to fix it 200px from the top
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

  return (
    <div style={containerStyle}>
      {/* Mimic the card for Selector */}
      <div style={cardStyle}>
        <h2 style={titleStyle}>{data[0].title}</h2>
        {/* Add the Selector inside the styled box */}
        <div>
          <Selector
            options={['Male', 'Female']}
            onSelect={setGender}
            multiple={false}
          />
        </div>
      </div>
      
      <Button
        className="button"
        label="Next"
        onClick={goToQuestion1}
        disabled={!gender}
      />
    </div>
  );
};

export default Question0;
