import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Input from '../components/Input';
import Button from '../components/Button';

const Question5 = () => {
  const {
    weight,
    setWeight,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const goToQuestion6 = () => {
    navigate('/Question6');
  };
  const goToQuestion4 = () => {
    navigate('/Question4');
  };

  const data = [
    {
      title: 'What Is Your Weight?',
    },
  ];

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
          value={weight} 
          onChange={setWeight} 
          placeholder="Enter your weight" 
          type="number" 
          max={500} // Max weight set to 500 lbs
        />
        </div>
      </div>

      <div style={buttonContainerStyle}>
        <Button
          className="button"
          label="Prev"
          onClick={goToQuestion4}
        />
        <Button
          className="button"
          label="Next"
          onClick={goToQuestion6}
          disabled={!weight}
        />
      </div>
    </div>
  );
};

export default Question5;
