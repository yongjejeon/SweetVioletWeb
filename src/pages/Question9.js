import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Button from '../components/Button';
import Input from '../components/Input';
import ProgressBar from '../components/ProgressBar'; 
import './Questions.css'; // Import the shared CSS file

const Question8 = () => {
  const {
    Goals, // Access the state
    setGoals, // Update the state
    setMealData,
    setMealDetails,
    setLoading,
    currentQuestion, 
    setCurrentQuestion, 
    totalQuestions,
    setNavigationFromQuestion8, // Access the setter for navigation flag
  } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentQuestion(9); 
  }, [setCurrentQuestion]);

  const goToQuestion8 = () => {
    navigate('/Question8');
  };

  const handleGenerateMealPlan = async () => {
    // Set the navigation flag to true when navigating from Question8
    setNavigationFromQuestion8(true);
    navigate('/meal-plan-v2'); // Navigate after setting the flag
  };

  const data = [
    {
      title: 'Do You Have Any Other Dietary Restrictions?',
    },
  ];

  return (
    <div className="page-wrapper"> {/* Wrap in page-wrapper for centering */}
      <ProgressBar currentQuestion={currentQuestion} totalQuestions={totalQuestions} />
      <div className="container">
        <div className="card">
          <h2 className="card-title">{data[0].title}</h2>
          {/* Input field for Goals, type 'text' */}
          <Input 
            value={Goals} 
            onChange={setGoals} 
            placeholder="Enter here..." 
            type="text" // Set type to 'text' for goals
          />
        </div>

        <div className="button-container">
          <Button
            className="button"
            label="Prev"
            onClick={goToQuestion8}
          />
          <Button
            className="button"
            label="Generate Meal"
            onClick={handleGenerateMealPlan}
            disabled={!Goals.trim()} // Disable if Goals is empty or just spaces
          />
        </div>
      </div>
      
    </div>
  );
};

export default Question8;
