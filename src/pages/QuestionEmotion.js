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

  return (
    <div className="page-wrapper">
      {/* Fixed container for the questions and button */}
      <div className="container">
        {/* Card for Dominant Mood */}
        <div className="card">
          <h2 className="card-title">How are You Feeling Right Now?</h2>
          <div>
            <Selector
              options={dominantMoods}
              onSelect={setSelectedMood}
              multiple={false}
            />
          </div>
        </div>

        {/* Card for Emotion Goal */}
        <div className="card">
          <h2 className="card-title">What’s Your Emotional Goal Right Now?</h2>
          <div>
            <Selector
              options={emotionGoals}
              onSelect={setSelectedEmotionGoal}
              multiple={false}
            />
          </div>
        </div>

        {/* Button container */}
        <div className="button-container">
          <Button
            className="button"
            label="Next"
            onClick={goToNext}
            disabled={!selectedEmotionGoal || !selectedMood} // Disable Next if inputs are incomplete
          />
        </div>
      </div>

      {/* Scrollable content below the fixed container */}
      <div className="scrollable-content">
        {/* Extra content goes here */}
      </div>
    </div>
  );
};

export default QuestionEmotion;
