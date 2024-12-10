import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Selector from '../components/Selector';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import './Questions.css';

const Question1 = () => {
  const { selectedMeals, 
    setSelectedMeals, 
    currentQuestion,
    setCurrentQuestion,
    totalQuestions, } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentQuestion(3); 
  }, [setCurrentQuestion]);

  const goToQuestion2 = () => {
    navigate('/Question2');
  };

  const goToQuestion0 = () => {
    navigate('/Question0');
  };

  const data = [
    {
      title: 'What Meals Do You Want To Prep For?',
    },
  ];

  return (
    <div className="page-wrapper">
      <ProgressBar currentQuestion={currentQuestion} totalQuestions={totalQuestions} />
      <div className="container">
        {/* Mimic the card for Selector */}
        <div className="card">
          <h2 className="card-title">{data[0].title}</h2>
          {/* Add the Selector inside the styled box */}
          <div>
            <Selector
              options={['Breakfast', 'Lunch', 'Dinner']}
              onSelect={setSelectedMeals}
              multiple={true}
            />
          </div>
        </div>

        {/* Button container to display Prev and Next buttons horizontally */}
        <div className="button-container">
          <Button
            className="button"
            label="Prev"
            onClick={goToQuestion0}
          />
          <Button
            className="button"
            label="Next"
            onClick={goToQuestion2}
            disabled={!selectedMeals || selectedMeals.length === 0}
          />
        </div>
      </div>
    </div>
  );
};

export default Question1;
