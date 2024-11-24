import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Selector from '../components/Selector';
import Button from '../components/Button';

const QuestionEmotion = () => {
  const {
    selectedEmotionGoal,
    setSelectedEmotionGoal,
    selectedMood,
    setSelectedMood,
  } = useContext(AppContext);

  const navigate = useNavigate();

  // Navigation logic
  const goToNext = () => {
    navigate('/Question0');
  };

  // Emotion goal options
  const emotionGoals = [
    'Calm Down',
    'Feel Energized',
    'Focus and Stay Sharp',
    'Feel Comforted',
    'Celebrate or Treat Myself',
    'Recover',
  ];

  // Dominant mood options
  const dominantMoods = [
    'Happy',
    'Stressed',
    'Relaxed',
    'Motivated',
    'Tired',
    'Anxious',
    'Neutral',
  ];

  // Styling for the container (fixed 200px from the top)
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column', // Stack everything vertically
    alignItems: 'center', // Center content horizontally
    position: 'fixed', // Fix the container's position relative to the page
    top: '150px', 
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
    maxWidth: '700px',
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
    justifyContent: 'flex-end', // Align buttons to the right
    width: '100%', // Make buttons take up full width
    maxWidth: '600px', // Limit max width to align with the card
    marginTop: '20px', // Add some space between the card and buttons
    gap: '20px', // Add gap between the buttons
  };

  return (
    <div style={containerStyle}>
      {/* Card for Dominant Mood */}
      <div style={cardStyle}>
        <h2 style={titleStyle}>How are You Feeling Right Now?</h2>
        <div>
          <Selector
            options={dominantMoods}
            onSelect={setSelectedMood}
            multiple={false}
          />
        </div>
      </div>
  
      {/* Card for Emotion Goal */}
      <div style={{ ...cardStyle, marginTop: '20px' }}>
        <h2 style={titleStyle}>What’s Your Emotional Goal Right Now?</h2>
        <div>
          <Selector
            options={emotionGoals}
            onSelect={setSelectedEmotionGoal}
            multiple={false}
          />
        </div>
      </div>
  
      {/* Button container */}
      <div style={buttonContainerStyle}>
        <Button
          className="button"
          label="Next"
          onClick={goToNext}
          disabled={!selectedEmotionGoal || !selectedMood} // Disable Next if inputs are incomplete
        />
      </div>
    </div>
  );
};

export default QuestionEmotion;
