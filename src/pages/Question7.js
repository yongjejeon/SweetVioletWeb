import React, { useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Button from '../components/Button';
import Selector from '../components/Selector'; // Import the Selector component
import ProgressBar from '../components/ProgressBar'; 
import './Questions.css'; // Import the shared CSS file

const Question7 = () => {
  const { preferredCuisine, setPreferredCuisine, currentQuestion, setCurrentQuestion, totalQuestions } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentQuestion(7); 
  }, [setCurrentQuestion]);

  const goToQuestion6 = () => {
    navigate('/Question6');
  };

  const goToQuestion8 = () => {
    navigate('/Question8');
  };

  const data = [
    {
      title: 'What Is Your Preferred Cuisine?',
    },
  ];

  return (
    <div className="page-wrapper"> {/* Wrap in page-wrapper for centering */}
    <ProgressBar currentQuestion={currentQuestion} totalQuestions={totalQuestions} />
      <div className="container">
        <div className="card">
          <h2 className="card-title">{data[0].title}</h2>
          {/* Selector component for predefined cuisine types */}
          <Selector
            options={[
              'American',
              'Asian',
              'British',
              'Caribbean',
              'Central Europe',
              'Chinese',
              'Eastern Europe',
              'French',
              'Greek',
              'Indian',
              'Italian',
              'Japanese',
              'Korean',
              'Kosher',
              'Mediterranean',
              'Mexican',
              'Middle Eastern',
              'Nordic',
              'South American',
              'South East Asian',
              'World',
            ]}
            onSelect={setPreferredCuisine} // Update context with selected value
            selected={preferredCuisine} // Current selection
            multiple={true}
          />
        </div>

        <div className="button-container">
          <Button
            className="button"
            label="Prev"
            onClick={goToQuestion6}
          />
          <Button
            className="button"
            label="Next"
            onClick={goToQuestion8}
            disabled={!preferredCuisine || preferredCuisine.length === 0} // Disable Next if nothing is selected
          />
        </div>
      </div>
    </div>
  );
};

export default Question7;
