import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ currentQuestion, totalQuestions }) => {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-outer">
        <div
          className="progress-bar-inner"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <p className="progress-text">
        Question {currentQuestion} of {totalQuestions}
      </p>
    </div>
  );
};

export default ProgressBar;
