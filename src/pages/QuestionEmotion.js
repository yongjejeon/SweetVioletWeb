import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Selector from '../components/Selector';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
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
    currentQuestion,
    setCurrentQuestion,
    totalQuestions,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const [moodImage, setMoodImage] = useState(null);

  useEffect(() => {
    setCurrentQuestion(1); // Set the current question to 1 when this page loads
  }, [setCurrentQuestion]);

  // Navigation logic
  const goToNext = () => {
    navigate('/Question2');
  };

  const emotionGoals = [
    'Calm Down',
    'Feel Energized',
    'Focus and Stay Sharp',
    'Feel Comforted',
    'Celebrate or Treat Myself',
    'Recover',
  ];

  const dominantMoods = [
    'Happy',
    'Stressed',
    'Relaxed',
    'Motivated',
    'Tired',
    'Anxious',
    'Neutral',
  ];

  const moodImages = {
    Happy,
    Stressed,
    Relaxed,
    Motivated,
    Tired,
    Anxious,
    Neutral,
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setMoodImage(moodImages[mood] || null);
  };

  return (
    <div className="page-wrapper">
      {/* Progress Bar */}
      <ProgressBar currentQuestion={currentQuestion} totalQuestions={totalQuestions} />

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
              disabled={!selectedEmotionGoal || !selectedMood}
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
