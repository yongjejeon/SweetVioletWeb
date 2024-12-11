import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Selector from '../components/Selector';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar'; 
import './Questions.css';

const Question2 = () => {
  const { 
    selectedGoal, 
    setSelectedGoal, 
    currentQuestion, 
    setCurrentQuestion, 
    totalQuestions 
  } = useContext(AppContext);

  const navigate = useNavigate();


  useEffect(() => {
    setCurrentQuestion(2); 
  }, [setCurrentQuestion]);

  const goToQuestion3 = () => {
    navigate('/Question3');
  };

  const goToQuestionEmotion = () => {
    navigate('/QuestionEmotion');
  };

  const data = [
    {
      title: 'What Are Your Goals?',
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
              options={['Maintain', 'Bulk', 'Cut']}
              onSelect={setSelectedGoal}
              multiple={false}
            />
          </div>
        </div>

        {/* Button container to display Prev and Next buttons horizontally */}
        <div className="button-container">
          <Button className="button" label="Prev" onClick={goToQuestionEmotion} />
          <Button
            className="button"
            label="Next"
            onClick={goToQuestion3}
            disabled={!selectedGoal || selectedGoal.length === 0}
          />
        </div>
      </div>
    </div>
  );
};

export default Question2;
