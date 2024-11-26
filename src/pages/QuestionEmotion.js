import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Selector from '../components/Selector';
import Button from '../components/Button';
import Happy from '../images/Happy.png';
import Anxious from '../images/Anxious.png';
import Tired from '../images/Tired.png';
import Relaxed from '../images/Relaxed.png';
import Stressed from '../images/Stressed.png';
import Neutral from '../images/Neutral.png';
import Motivated from '../images/Motivated.png';
import './QuestionEmotion.css';

const QuestionEmotion = () => {
  const {
    selectedEmotionGoal,
    setSelectedEmotionGoal,
    selectedMood,
    setSelectedMood,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const [moodImage, setMoodImage] = useState(null);

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

  // Map moods to their images
  const moodImages = {
    Happy,
    Stressed,
    Relaxed,
    Motivated,
    Happy, // If no specific image for "Motivated," fallback to Happy
    Tired,
    Anxious,
    Neutral,
  };

  // Handle mood selection
  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setMoodImage(moodImages[mood] || null); // Set the mood image if available
  };

  return (
    <div className="page-wrapper">
      <div className="content-wrapper">
        {/* Left Section: Questions */}
        <div className="questions-section">
          {/* Card for Dominant Mood */}
          <div className="card">
            <h2 className="card-title">How are You Feeling Right Now?</h2>
            <Selector
              options={dominantMoods}
              onSelect={handleMoodSelect}
              multiple={false}
            />
          </div>

          {/* Card for Emotion Goal */}
          <div className="card">
            <h2 className="card-title">What’s Your Emotional Goal Right Now?</h2>
            <Selector
              options={emotionGoals}
              onSelect={setSelectedEmotionGoal}
              multiple={false}
            />
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

        {/* Right Section: Character Image */}
        <div className="character-image-container">
          {moodImage && (
            <img
              src={moodImage}
              alt={selectedMood}
              className="character-image"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionEmotion;
