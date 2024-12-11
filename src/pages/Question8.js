import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Selector from '../components/Selector';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar'; // Import ProgressBar
import './Questions.css';

const Question8 = () => {
  const {
    gender,
    setGender,
    currentQuestion,
    setCurrentQuestion,
    totalQuestions,
  } = useContext(AppContext);
  const navigate = useNavigate();

  // Update the current question index when this page loads
  useEffect(() => {
    setCurrentQuestion(8); 
  }, [setCurrentQuestion]);

  const goToQuestion9 = () => {
    navigate('/Question9');
  };

  const goToQuestion7 = () => {
    navigate('/Question7');
  };

  const data = [
    {
      title: 'Do you Have any of the Following Dietary Preferences?',
    },
  ];

  return (
    <div className="page-wrapper">
      {/* Progress Bar */}
      <ProgressBar currentQuestion={currentQuestion} totalQuestions={totalQuestions} />

      <div className="container">
        {/* Mimic the card for Selector */}
        <div className="card">
          <h2 className="card-title">{data[0].title}</h2>
          {/* Add the Selector inside the styled box */}
          <div>
            <Selector
              options={['Vegan','Vegetarian','Gluten-Free','Pescatarian']}
              onSelect={setGender}
              multiple={false}
            />
          </div>
        </div>

        <div style={buttonContainerStyle}>
          <Button
            className="button"
            label="Prev"
            onClick={goToQuestion7}
          />
          <Button
            className="button"
            label="Next"
            onClick={goToQuestion9}
            disabled={!gender}
          />
        </div>
      </div>
      
    </div>
  );
};

export default Question8;

// Styling for the button container to align buttons horizontally
const buttonContainerStyle = {
  display: 'flex', // Enable flexbox
  justifyContent: 'flex-end', // Align buttons to the right
  width: '100%', // Make buttons take up full width
  maxWidth: '600px', // Limit max width to align with the card
  marginTop: '20px', // Add some space between the card and buttons
  gap: '20px', // Add gap between the buttons
};
