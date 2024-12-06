import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Input from '../components/Input';
import Button from '../components/Button';
import './Questions.css'; // Import the shared CSS file

const Question4 = () => {
  const { setHeight } = useContext(AppContext); // Use context to store the final height in inches
  const navigate = useNavigate();
  const [feet, setFeet] = useState(''); // Local state for feet
  const [inches, setInches] = useState(''); // Local state for inches

  const goToQuestion5 = () => {
    // Calculate height in total inches and update the context
    const height = parseInt(feet || 0) * 12 + parseInt(inches || 0);
    setHeight(height);
    navigate('/Question5');
  };

  const goToQuestion3 = () => {
    navigate('/Question3');
  };

  const isNextDisabled = () => {
    return feet === '' || inches === '' || parseInt(inches) >= 12;
  };

  const data = [
    {
      title: 'What Is Your Height?',
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="card">
          <h2 className="card-title">{data[0].title}</h2>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' ,justifyContent: 'center' }}>
            <Input
              value={feet}
              onChange={(value) => setFeet(value)}
              placeholder="Feet"
              type="number"
              max={9} // Limit max feet to 9
            />
            <span>ft</span>
            <Input
              value={inches}
              onChange={(value) => setInches(value)}
              placeholder="Inches"
              type="number"
              max={11} // Limit max inches to 11
            />
            <span>in</span>
          </div>
        </div>

        <div className="button-container">
          <Button
            className="button"
            label="Prev"
            onClick={goToQuestion3}
          />
          <Button
            className="button"
            label="Next"
            onClick={goToQuestion5}
            disabled={isNextDisabled()}
          />
        </div>
      </div>
    </div>
  );
};

export default Question4;