import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Button from '../components/Button';
import Selector from '../components/Selector'; // Import the reusable Selector component
import ProgressBar from '../components/ProgressBar'; 
import './Questions.css'; // Import the shared CSS file

const Question6 = () => {
  const { dietaryRestriction, setDietaryRestriction, currentQuestion, setCurrentQuestion, totalQuestions } =
    useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentQuestion(8); 
  }, [setCurrentQuestion]);

  const goToQuestion5 = () => {
    navigate('/Question5');
  };

  const goToQuestion7 = () => {
    navigate('/Question7');
  };

  const data = [
    {
      title: 'Choose Your Dietary Label',
    },
  ];

  return (
    <div className="page-wrapper"> {/* Wrap the content in a page-wrapper */}
      {/* Progress Bar */}
      <ProgressBar currentQuestion={currentQuestion} totalQuestions={totalQuestions} />

      <div className="container">
        <div className="card">
          <h2 className="card-title">{data[0].title}</h2>
          {/* Selector component for predefined dietary restrictions */}
          <Selector
            options={[
              'Balanced',
              'High-Fiber',
              'High-Protein',
              'Low-Carb',
              'Low-Fat',
              'Low-Sodium',
            ]}
            onSelect={setDietaryRestriction} // Update the context with selected value
            selected={dietaryRestriction} // Current selection
          />
        </div>

        <div className="button-container">
          <Button
            className="button"
            label="Prev"
            onClick={goToQuestion5}
          />
          <Button
            className="button"
            label="Next"
            onClick={goToQuestion7}
            disabled={!dietaryRestriction} // Disable Next if nothing is selected
          />
        </div>
      </div>
    </div>
  );
};

export default Question6;
