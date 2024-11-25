import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Selector from '../components/Selector';
import Button from '../components/Button';
import './Questions.css';

const Question0 = () => {
  const { gender, setGender } = useContext(AppContext);
  const navigate = useNavigate();

  const goToQuestion1 = () => {
    navigate('/Question1');
  };

  const goToQuestionE = () => {
    navigate('/QuestionEmotion');
  };

  const data = [
    {
      title: 'What Is Your Sex?',
    },
  ];

  return (
    <div className='page-wrapper'>
      <div className="container">
        {/* Mimic the card for Selector */}
        <div className="card">
          <h2 className="card-title">{data[0].title}</h2>
          {/* Add the Selector inside the styled box */}
          <div>
            <Selector
              options={['Male', 'Female']}
              onSelect={setGender}
              multiple={false}
            />
          </div>
        </div>
        
        <div style={buttonContainerStyle}>
          <Button
            className="button"
            label="Prev"
            onClick={goToQuestionE}
          />
          <Button
            className="button"
            label="Next"
            onClick={goToQuestion1}
            disabled={!gender}
          />
        </div>
      </div>
    </div>
    
  );
};

export default Question0;

// Styling for the button container to align buttons horizontally
const buttonContainerStyle = {
  display: 'flex', // Enable flexbox
  justifyContent: 'flex-end', // Align buttons to the right
  width: '100%', // Make buttons take up full width
  maxWidth: '600px', // Limit max width to align with the card
  marginTop: '20px', // Add some space between the card and buttons
  gap: '20px', // Add gap between the buttons
};
