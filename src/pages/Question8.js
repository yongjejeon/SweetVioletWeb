import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Button from '../components/Button';
import Input from '../components/Input';
import './Questions.css'; // Import the shared CSS file

const Question8 = () => {
  const {
    Goals, // Access the state
    setGoals, // Update the state
    setMealData,
    setMealDetails,
    setLoading,
    setNavigationFromQuestion8, // Access the setter for navigation flag
  } = useContext(AppContext);

  const navigate = useNavigate();

  const goToQuestion7 = () => {
    navigate('/Question7');
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
            onClick={goToQuestion7}
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
