import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Input from '../components/Input';
import Button from '../components/Button';

const Question4 = () => {
  const {
    height,
    setHeight,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const goToQuestion5 = () => {
    navigate('/Question5');
  };
  const goToQuestion3 = () => {
    navigate('/Question3');
  };

  const data = [
    {
      title: 'What Is Your Height?',
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
    backgroundColor: '#90a5a0',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    padding: '20px',
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Roboto, sans-serif',
  };

  const titleStyle = {
    fontSize: '2rem',
    marginBottom: '15px',
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Poppins, sans-serif',
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
        <div>
        <Input 
          value={height} 
          onChange={setHeight} 
          placeholder="Enter your height" 
          type="number" 
          max={108} // Max height set to 108 inches (9 feet)
        />

        </div>
      </div>

      <div style={buttonContainerStyle}>
        <Button
          className="button"
          label="Prev"
          onClick={goToQuestion3}
        />
        <Button
          className="button"
          label="Next"
          onClick={goToQuestion5}
          disabled={!height}
        />
      </div>
    </div>
  );
};

export default Question4;
