import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Input from '../components/Input';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar'; // Import the ProgressBar component
import './Questions.css'; // Import the shared CSS file

const Question5 = () => {
  const { weight, setWeight, currentQuestion, setCurrentQuestion, totalQuestions } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentQuestion(5); 
  }, [setCurrentQuestion]);

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

  return (
    <div className="page-wrapper">
      {/* Progress Bar */}
      <ProgressBar currentQuestion={currentQuestion} totalQuestions={totalQuestions} />

      <div className="container">
        <div className="card">
          <h2 className="card-title">{data[0].title}</h2>
          <div>
            <Input
              value={weight}
              onChange={setWeight}
              placeholder="Enter your weight (lbs)"
              type="number"
              min={0} // Minimum weight
              max={500} // Maximum weight set to 500 lbs
            />
          </div>
        </div>

        <div className="button-container">
          <Button
            className="button"
            label="Prev"
            onClick={goToQuestion4}
          />
          <Button
            className="button"
            label="Next"
            onClick={goToQuestion6}
            disabled={!weight || weight <= 0}
          />
        </div>
      </div>
    </div>
  );
};

export default Question5;
