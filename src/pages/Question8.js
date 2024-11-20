import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import Button from '../components/Button';

const Question8 = () => {
  const {
    Goals, // Access the state
    setGoals, // Update the state
  } = useContext(AppContext);

  const navigate = useNavigate();

  const goToQuestion7 = () => {
    navigate('/Question7');
  };

  const goToMealPlans = () => {
    navigate('/meal-plan-v2');
  };

  return (
    <div className="container">
      <h1 className="title">Do You Have Any Other Goals You Want To Achieve?</h1>
      <div className="input-item">
        <input
          type="text"
          value={Goals}
          onChange={(e) => setGoals(e.target.value)} // Update context state
          placeholder="Enter your goals here..."
          className="input-field"
        />
      </div>
      <Button className="button" label="Prev" onClick={goToQuestion7} />
      <Button 
        className="button" 
        label="Generate Meal" 
        onClick={goToMealPlans} 
        disabled={!Goals.trim()} // Disable if Goals is empty or just spaces
      />
    </div>
  );
};

export default Question8;
